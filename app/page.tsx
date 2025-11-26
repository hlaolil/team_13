// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Package, Users, Sparkles, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-amber-900/5 bg-grid"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-amber-100 px-6 py-3 text-amber-800 font-medium">
            <Sparkles className="h-5 w-5" />
            Welcome to the future of handmade
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover <span className="text-amber-600">Handcrafted</span><br />
            Treasures from Real Artisans
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Connect directly with talented creators. Every piece tells a story. Every purchase supports a dream.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-10 py-6">
              <Link href="/products">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2">
              <Link href="/dashboard">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Become a Seller
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Package className="h-32 w-32 text-amber-600" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Users className="h-40 w-40 text-orange-500" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Craft
            </h2>
            <p className="text-xl text-gray-600">Find exactly what your heart desires</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Woodwork", icon: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
              { name: "Jewelry", icon: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
              { name: "Textiles", icon: "https://images.unsplash.com/photo-1604176354204-9266a5a3e7b6?w=400" },
              { name: "Ceramics", icon: "https://images.unsplash.com/photo-1575987514166-4c5e1d2b16ca?w=400" },
            ].map((cat) => (
              <Card key={cat.name} className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all">
                <div className="aspect-square relative">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                    {cat.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-amber-600 mb-4">500+</div>
              <p className="text-xl text-gray-700">Artisans Joined</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-amber-600 mb-4">10,000+</div>
              <p className="text-xl text-gray-700">Unique Items</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-amber-600 mb-4">50+</div>
              <p className="text-xl text-gray-700">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to find something truly special?
          </h2>
          <p className="text-xl text-amber-100 mb-10">
            Join thousands who have discovered the joy of owning something handmade with love.
          </p>
          <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-gray-100 text-xl px-12 py-7">
            <Link href="/products">
              Start Shopping Now <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
