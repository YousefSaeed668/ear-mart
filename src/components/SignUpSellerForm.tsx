"use client";

import { signUpSeller } from "@/app/(auth)/register/seller/acitons";
import { signupSellerSchema, SignupSellerType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { AuthInput } from "./AuthInput";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import LoadingButton from "./LoadingButton";

motion;
const steps = [
  {
    id: "Step 1",
    fields: ["Businessname", "Email", "Password", "ConfirmPassword"],
  },
  {
    id: "Step 1",
    fields: [
      "Businessname",
      "Address",
      "City",
      "PostalCode",
      "FirstName",
      "LastName",
      "Email",
      "PhoneNumber",
      "Website",
      "MainInventoryAdress",
    ],
  },
];

export function SignUpSellerForm({ Role }: { Role: string }) {
  const [prevousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - prevousStep;
  const form = useForm<SignupSellerType>({
    resolver: zodResolver(signupSellerSchema),
  });
  const {
    handleSubmit,
    trigger,
    control,
    setError,
    setFocus,
    formState: { isSubmitting },
  } = form;

  type FieldName = keyof SignupSellerType;
  async function next() {
    const fileds = steps[currentStep].fields;

    const output = await trigger(fileds as FieldName[], { shouldFocus: true });
    if (!output) return;
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  }
  function prev() {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  }
  const onSubmit = async (values: SignupSellerType) => {
    const formData = new FormData();
    formData.append("Role", Role);
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const data = await signUpSeller(formData);
      if (data.errors) {
        if (
          ["Businessname", "Email", "Password"].some((key) =>
            Object.keys(data.errors).includes(key)
          )
        ) {
          prev();
        }
        let lastKey: string | null = null;
        for (const [key, value] of Object.entries(data.errors)) {
          const errorMessage = Array.isArray(value) ? value[0] : value;

          setError(key as FieldName, {
            type: "server",
            message: errorMessage as string,
          });
          lastKey = key;
        }
        if (lastKey) {
          setFocus(lastKey as FieldName);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4 ">
                <div className="relative hidden md:block sm:w-[430px] sm:h-[410px] lg:w-[705px] lg:h-[681px]">
                  <Image src="/sellerImage.svg" fill alt="sign-up" />
                </div>
                <div className="lg:max-w-[38%] max-md:w-full max-md:mt-12 border px-12 py-6 rounded-xl">
                  <h1 className="text-4xl">
                    Create an account as a{" "}
                    <span className="font-bold">Seller</span>
                  </h1>
                  <p>Enter your details below - All fields are required</p>
                  <div className="flex flex-col gap-10 mt-6">
                    <FormField
                      control={control}
                      name="Businessname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AuthInput
                              placeholder="Business Name"
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="Email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AuthInput
                              {...field}
                              placeholder="Email"
                              type="text"
                            />
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
                            <AuthInput
                              placeholder="Password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="ConfirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AuthInput
                              {...field}
                              placeholder="Confirm Password"
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button onClick={next} type="button">
                      Create Account
                    </Button>
                    <p className="mt-2 text-center">
                      Already have account?{" "}
                      <Link
                        href="/login "
                        className="ml-4 underline-offset-8 underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full "
            >
              <div>
                <h1 className="text-2xl my-6 mb-16">
                  Thanks to finish your first step <br />
                  Now we have some{" "}
                  <span className="font-semibold">
                    Information Required
                  </span>{" "}
                </h1>
                <div className="flex flex-col gap-20">
                  <div>
                    <h2 className="font-bold text-lg mb-6">
                      Business Information -
                      <span className="text-base font-normal">
                        All fields are required
                      </span>
                    </h2>
                    <div className="grid gap-6 grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3">
                      <FormField
                        control={control}
                        name="Businessname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Business Name"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="Address"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Main Business Address"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="City"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="City"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="PostalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Zip/Postal Code"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg mb-6">
                      Business Contact Information -
                      <span className="text-base font-normal">
                        All Fields are required
                      </span>
                    </h2>
                    <div className="grid gap-6 grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3">
                      <FormField
                        control={control}
                        name="FirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="First Name"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="LastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Last Name"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="BusinessEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Business Email"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="PhoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Phone Number"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="Website"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Website"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="MainInventoryAdress"
                        render={({ field }) => (
                          <FormItem className=" min-[450px]:col-span-2 md:col-span-3">
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Main Inventory Adress (To Receive Your Products From)"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg mb-6">
                      Certificate Information -
                      <span className="text-base font-normal">
                        All Fields are required
                      </span>
                    </h2>
                    <div className="space-y-10">
                      <FormField
                        control={control}
                        name="Certificate"
                        render={({ field: { value, ...fieldValues } }) => (
                          <FormItem>
                            <FormLabel className="sm:w-[50%] md:w-[40%] lg:w-[30%] flex items-center relative border rounded-xl px-6 py-3">
                              <span className="p-1/2 rounded-full bg-primaryColor/20 inline-block mr-6">
                                <ChevronUp
                                  strokeWidth={3}
                                  className="h-5 w-5 "
                                  color="#00693D"
                                />
                              </span>
                              <span>UPLOAD YOUR CERTIFICATE</span>
                            </FormLabel>
                            <FormControl>
                              <AuthInput
                                className="hidden"
                                {...fieldValues}
                                onChange={(e: any) => {
                                  const file = e.target.files?.[0];
                                  fieldValues.onChange(file);
                                }}
                                placeholder="Cetificate"
                                type="file"
                                accept={
                                  "image/png, image/jpeg, image/jpg, application/pdf, application/docx"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="Comment"
                        render={({ field }) => (
                          <FormItem className=" min-[450px]:col-span-2 md:col-span-3">
                            <FormControl>
                              <AuthInput
                                {...field}
                                placeholder="Comment"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 md:gap-24 justify-center mt-28">
                  <Button
                    variant="outline"
                    type="button"
                    className="min-w-[101px] px-6 md:px-28"
                    onClick={prev}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    className="min-w-[101px] px-6 md:px-28"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Confirm
                  </LoadingButton>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </Form>
    </div>
  );
}
