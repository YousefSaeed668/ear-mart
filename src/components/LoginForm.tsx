"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { AuthInput } from "./AuthInput";
import { useForm } from "react-hook-form";
import { signinUser, SignInUserType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import LoadingButton from "./LoadingButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const { data: session } = useSession();

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const form = useForm<SignInUserType>({
    resolver: zodResolver(signinUser),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: SignInUserType) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        Email: data.Email,
        Password: data.Password,
      });

      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }
  useEffect(() => {
    if (session && session?.user?.roles === "seller") {
      router.push("/seller/dashboard");
    }
    if (session && session?.user?.roles === "consumer") {
      router.push("/");
    }
  }, [session, router]);
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 w-full"
      >
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded "
            role="alert"
          >
            <strong className="font-bold capitalize">{errorMessage}</strong>
            {/* <span className="block sm:inline">{state.message}</span> */}
          </div>
        )}
        <FormField
          control={control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthInput placeholder="Email" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthInput placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="rounded-sm px-8 py-6"
          >
            LOG IN
          </LoadingButton>

          <Link href="/auth/forgot-password" className="text-primaryColor">
            {" "}
            Forgot Password?
          </Link>
        </div>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/Register" className="text-primaryColor ml-4">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
