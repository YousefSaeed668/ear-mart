"use server";
export async function signUpSeller(formData: FormData) {
  formData.append("Role", "Seller");
  console.log(formData.get("Certificate"));

  const response = await fetch(
    "http://ear-mart.runasp.net/api/Auth/RegisterSeller",
    {
      method: "POST",
      body: formData,
    }
  );
  if (response.status === 500) {
    console.log("a7a");
  }
  const data = await response.json();
  console.log(data);
}
