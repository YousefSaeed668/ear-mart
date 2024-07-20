import Image from "next/image";

import { SignUpForm } from "@/components/auth-components/SignUpForm";

export default function consumerPage() {
  return (
    <div>
      <div className="flex items-center gap-4 w-full">
        <div className="relative hidden md:block sm:w-[480px] sm:h-[460px] lg:w-[805px] lg:h-[781px]">
          <Image src="/consumerImage.svg" fill alt="sign-up" />
        </div>
        <div className="max-md:w-full max-md:mt-12 lg:max-w-[32%] ">
          <h1 className="text-4xl">
            Create an account as a <span className="font-bold">consumer</span>
          </h1>
          <p>Enter your details below - All fields are required</p>

          <SignUpForm Role={"Consumer"} />
        </div>
      </div>
    </div>
  );
}
