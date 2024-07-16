import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block sm:w-[480px] sm:h-[460px] lg:w-[805px] lg:h-[781px]">
          <Image src="/signin.svg" fill alt="sign-up" />
        </div>
        <div className="lg:max-w-[32%]">
          <h1 className="text-4xl font-bold">Login to your account</h1>
          <p>Enter your details below </p>
          <form action="" className="flex flex-col gap-3 mt-10">
            <div className="group">
              <input type="text" className="google" required />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
            </div>

            <div className="group">
              <input type="text" className="google" required />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit" className="text-lg px-12 py-7 rounded-sm">
                Login
              </Button>
              <Link href="" className="text-primaryColor">
                Forget Password?
              </Link>
            </div>

            <p className="mt-4 ">
              Don&apos;t Have Account{" "}
              <Link
                href="/Register"
                className="ml-4 underline-offset-8 underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
