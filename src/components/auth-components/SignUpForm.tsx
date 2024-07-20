"use client";

import { SubmitButton } from "../SubmitButton";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { registerCustomer } from "@/app/(auth)/register/consumer/actions";
import { useEffect, useRef } from "react";
import { AuthInput } from "../AuthInput";

const initalState = {
  message: "",
  error: "",
  path: "",
};
export function SignUpForm({ Role }: { Role: string }) {
  const [state, formAction] = useFormState(
    registerCustomer.bind(null, Role),
    initalState
  );
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state.path === "FullName" && fullNameRef.current) {
      fullNameRef.current.focus();
    } else if (state.path === "Email" && emailRef.current) {
      emailRef.current.focus();
    } else if (state.path === "Password" && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [state.path]);
  return (
    <form action={formAction} className="flex flex-col gap-10 mt-10">
      {state.message && (
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong className="font-bold">{state.message}</strong>
          {/* <span className="block sm:inline">{state.message}</span> */}
        </div>
      )}
      <div>
        <AuthInput
          type="text"
          name="FullName"
          ref={fullNameRef}
          placeholder="Name"
        />
        {state.path === "FullName" && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}
      </div>
      <div>
        <AuthInput
          type="text"
          name="Email"
          ref={emailRef}
          placeholder="Email"
        />
        {state.path === "Email" && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}
      </div>

      <div>
        <AuthInput
          type="password"
          name="Password"
          ref={passwordRef}
          placeholder="Password"
        />
        {state.path === "Password" && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}
      </div>
      <SubmitButton className="py-6">Create Account</SubmitButton>
      <Button
        type="button"
        variant="outline"
        className="flex py-6 items-center gap-4"
      >
        <Image
          src="/googleLogo.svg"
          alt="google"
          className=""
          width={24}
          height={24}
        />
        Sign up with Google
      </Button>
      <p className="mt-2 text-center">
        Already have account?{" "}
        <Link href="/login " className="ml-4 underline-offset-8 underline">
          Login
        </Link>
      </p>
    </form>
  );
}
