"use server";

import { signupUserSchema } from "@/lib/validation";

export async function registerCustomer(
  Role: string,
  prevState: any,
  formData: FormData
) {
  const values = Object.fromEntries(formData.entries());
  const { FullName, Email, Password } = values;
  const result = signupUserSchema.safeParse({ ...values, Role });
  if (!result.success) {
    return {
      message: "",
      error: result.error.issues[0].message,
      path: result.error.issues[0].path[0],
    };
  }
  const respond = await fetch("https://ear-mart.runasp.net/api/Auth/Register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FullName,
      Email,
      Password,
      Role,
    }),
  });

  const data = await respond.json();
  if (!respond.ok) {
    return {
      error: data.Message,
      message: "",
      path: data.Path,
    };
  }
  return {
    error: "",
    message: data.Message,
    path: "",
  };
}
