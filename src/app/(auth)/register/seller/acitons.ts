"use server";

import { redirect } from "next/navigation";

export async function signUpSeller(formData: FormData) {
  formData.append("Role", "Seller");
  const response = await fetch(
    "http://ear-mart.runasp.net/api/Auth/RegisterSeller",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.Success) {
    redirect("/login");
  }
  if (response.status === 400) {
    if (!data.Success) {
      return {
        errors: {
          [data.Path]: data.Message,
        },
      };
    }
    return data;
  }

  return data;
}
