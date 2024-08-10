import Image from "next/image";
import * as React from "react";
import loginImage from "@/assets/login-image.jpg";
import LoginForm from "@/components/forms/login-form";
import Link from "next/link";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-3xl font-bold">Login to bugbook</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              {`Don't have an account? Sign Up`}
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="Sign Up Image"
          className="w-1/2 hidden md:block object-cover"
        />
      </div>
    </main>
  );
};

export default LoginPage;
