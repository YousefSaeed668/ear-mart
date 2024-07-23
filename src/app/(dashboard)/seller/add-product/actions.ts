"use server";

import { authOptions } from "@/lib/auth";
import { createProductFormType } from "@/lib/validation";
import { getServerSession } from "next-auth";
type UploadedImage = {
  FileUrl: string;
};
type ServerActionData = Omit<createProductFormType, "Files"> & {
  Files: UploadedImage[];
};
export async function createNewProduct(data: ServerActionData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.Token) {
    throw new Error("Unauthorized: User not authenticated");
  }
  const token = session.user.Token;
  const editedData = {
    ...data,
    ProductVariants: data.ProductVariants.map((variant) => ({
      ...variant,
      DiscountPercent:
        variant.DiscountPercent === "" ? 0 : Number(variant.DiscountPercent),
      Price: Number(variant.Price),
      StockQuantity: Number(variant.StockQuantity),
    })),
    Files: data.Files.splice(1),
    ThumbnailUrl: data.Files[0].FileUrl,
  };

  const response = await fetch(
    "http://ear-mart.runasp.net/api/Product/CreateProduct",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedData),
    }
  );
  const result = await response.json();
  return result;
}
