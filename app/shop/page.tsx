import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShopContent from "./ShopContent";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-neutral-200 dark:bg-neutral-700 w-1/4" />
              <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-1/6" />
              <div className="grid grid-cols-3 gap-6 mt-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-700" />
                ))}
              </div>
            </div>
          </div>
        </div>
      }>
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  );
}
