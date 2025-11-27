'use server'

import { prisma } from "../prisma"
import { unstable_cache } from "next/cache";


export const getCachedInitialProducts = unstable_cache(
  async () => await getInitialProductsForBrowsing(),
  ["cached-initial-products"]
);

async function getInitialProductsForBrowsing() {
  return await prisma.product.findMany({ take: 15 });
}


const PRODUCTS_PER_PAGE = 15;
export async function getTotalBrowsePages(): Promise<number> {
  const totalProducts = await prisma.product.count();
  return Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
}