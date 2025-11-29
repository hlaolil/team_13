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



export async function getProductForViewing(id : string) {
  const product = await prisma.product.findUnique({
    where: {id : id},
    select : {
      id: true,
      user : {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          products:true
        }
      },
      category: true,
      description: true,
      price: true,
      reviews: {
        include: {
          user:{
            select:{
              firstName: true,
              lastName: true
            }
          }
        }
      },
      images: true,
      title: true
      
    }
  });
  return product
}