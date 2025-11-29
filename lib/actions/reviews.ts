"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "../generated/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { revalidatePath } from "next/cache";

export async function createReview(formData: FormData) {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    throw new Error("You must be logged in to leave a review.");
  }

  const productId = formData.get("productId") as string | null;
  const ratingRaw = formData.get("rating") as string | null;
  const commentRaw = formData.get("comment") as string | null;

  if (!productId) {
    throw new Error("Missing productId");
  }

  if (!ratingRaw) {
    throw new Error("Missing rating");
  }

  const rating = Number(ratingRaw);
  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be a number between 1 and 5");
  }

  const reviewData: Prisma.ReviewCreateInput = {
    rating,
    comment: commentRaw?.trim() || null,

    user: {
      connect: { id: user.id },
    },
    product: {
      connect: { id: productId },
    },
  };

  const review = await prisma.review.create({
    data: reviewData,
    include: {
      user: true,    // so you get firstname/lastname back
      product: true, // optional
    },
  });

  // revalidate the product page so the new review shows up
  revalidatePath(`/browse/product/view/${productId}`);

  return review;
}
