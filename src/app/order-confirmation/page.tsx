import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrderConfirmationContent from "./OrderConfirmationContent";

export const dynamic = "force-dynamic";

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }>
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </>
  );
}
