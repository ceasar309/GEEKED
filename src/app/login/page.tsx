import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-sm text-neutral-500">Sign in to your GEEKED account</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-8 border border-neutral-200 dark:border-neutral-700">
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
