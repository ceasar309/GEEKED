import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-sm text-neutral-500">Join GEEKED and discover premium fashion</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-8 border border-neutral-200 dark:border-neutral-700">
            <RegisterForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
