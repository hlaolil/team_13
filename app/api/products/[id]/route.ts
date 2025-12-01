// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Strong validation — matches your Prisma schema exactly
const updateProductSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).trim(),
  price: z.number().int().positive("Price must be greater than 0").int(),
  description: z.string().min(1, "Description is required").trim(),
  images: z.array(z.string().url("Each image must be a valid URL")).default([]),
  category: z.enum(["METALWORK", "TEXTILE", "WOODWORK"], {
    required_error: "Category is required",
    invalid_type_error: "Invalid category",
  }),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 14+ requirement
) {
  const { id } = await params; // Must await in Next.js 14+

  // Auth
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Ownership check
  const product = await prisma.product.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  if (product.userId !== currentUser.id) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Validate body
  let body;
  try {
    body = await request.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const parsed = updateProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.format() },
      { status: 400 }
    );
  }

  const { title, price, description, images, category } = parsed.data;

  // Update
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        price,
        description,
        images,
        category,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}