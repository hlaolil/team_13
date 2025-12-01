// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const updateProductSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  price: z.number().int().positive(),
  description: z.string().min(1).trim(),
  images: z.array(z.string().url()).default([]),
  category: z.enum(["METALWORK", "TEXTILE", "WOODWORK"]),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // ───── Auth check ─────
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

  // ───── Product ownership check ─────
  const product = await prisma.product.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  if (product.userId !== currentUser.id) {
    return new NextResponse("Forbidden: You can only edit your own products", {
      status: 403,
    });
  }

  // ───── Parse + validate body ─────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const parsed = updateProductSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.format() },
      { status: 400 }
    );
  }

  const { title, price, description, images, category } = parsed.data;

  // ───── Update product ─────
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
    console.error("Product update failed:", error);
    return new NextResponse("Failed to update product", { status: 500 });
  }
}
