// lib/product-images.ts
import "server-only";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

export async function saveProductImage(productId: string, file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${productId}-${randomUUID()}.${ext}`;
  const filePath = `${productId}/${fileName}`; 

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  await prisma.product.update({
    where: { id: productId },
    data: {
      images: {
        push: publicUrl,
      },
    },
  });

  return publicUrl;
}

export async function deleteProductImage(productId: string, imageUrl: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }

  const publicPrefix = `${baseUrl}/storage/v1/object/public/product-images/`;

  if (!imageUrl.startsWith(publicPrefix)) {
    throw new Error("imageUrl does not match expected Supabase public URL format");
  }

  const pathInBucket = imageUrl.replace(publicPrefix, ""); 

  const { error: removeError } = await supabase.storage
    .from("product-images")
    .remove([pathInBucket]);

  if (removeError) {
    throw new Error(`Failed to delete image: ${removeError.message}`);
  }


  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { images: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const updatedImages = product.images.filter((url) => url !== imageUrl);

  await prisma.product.update({
    where: { id: productId },
    data: {
      images: {
        set: updatedImages,
      },
    },
  });

  return updatedImages;
}
