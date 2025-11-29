"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface OtherUserProduct {
  id: string;
  title: string;
  price: number;
  images: string[]; // array of URLs
}

interface OtherUserProductsCarouselProps {
  products: OtherUserProduct[];
  currentProductId?: string; // optional so we can filter out the current one if you want
}

export default function OtherUserProductsCarousel({
  products,
  currentProductId,
}: OtherUserProductsCarouselProps) {
  // Optionally filter out the current product
  const filteredProducts = currentProductId
    ? products.filter((p) => p.id !== currentProductId)
    : products;

  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3; // how many cards to show at once (adjust as you like)

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, filteredProducts.length - visibleCount);

  const goPrev = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const goNext = () => {
    setScrollIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const slice = filteredProducts.slice(
    scrollIndex,
    scrollIndex + visibleCount
  );

  return (
    <div className="w-full">
      <h2 className="mb-2 text-lg font-semibold">More from this seller</h2>

      <div className="relative">
        {/* Left arrow */}
        {scrollIndex > 0 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-sm shadow hover:bg-white"
          >
            {"<"}
          </button>
        )}

        {/* Right arrow */}
        {scrollIndex < maxIndex && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-sm shadow hover:bg-white"
          >
            {">"}
          </button>
        )}

        {/* Cards */}
        <div className="flex gap-3 overflow-hidden px-6">
          {slice.map((product) => {
            const firstImage = product.images?.[0];
            const priceFormatted = `${(product.price / 100).toFixed(2)} €`; // adjust if not storing cents

            return (
              <Link
                key={product.id}
                href={`/browse/product/view/${product.id}`}
                className="min-w-[180px] max-w-[220px] flex-1 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-t-lg bg-gray-100">
                  {firstImage ? (
                    <Image
                      src={firstImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-2">
                  <p className="truncate text-sm font-medium">
                    {product.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    {priceFormatted}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
