import { LoginForm } from "@/components/auth-components/LoginForm";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4 justify-between w-full">
        <div className="relative hidden md:block sm:w-[480px] sm:h-[460px] lg:w-[805px] lg:h-[781px]">
          <Image src="/signin.svg" fill alt="sign-up" />
        </div>
        <div className="lg:max-w-[32%] max-md:w-full max-md:mt-16">
          <h1 className="text-4xl font-bold">Login to your account</h1>
          <p className="mb-6 mt-3">Enter your details below </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
