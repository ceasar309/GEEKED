"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import toast from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const role = (session.user as any)?.role;
      if (role !== "ADMIN") {
        toast.error("Admin access required");
        router.push("/admin/login");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-white text-center">
          <p className="text-lg">Redirecting to admin login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-950">
      <AdminSidebar />
      <main className="flex-1 p-8 text-neutral-200">{children}</main>
    </div>
  );
}
