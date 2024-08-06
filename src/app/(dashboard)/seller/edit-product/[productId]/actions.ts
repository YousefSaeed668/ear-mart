"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createProductFormType } from "@/lib/validation";

export async function getProductById(productId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.Token) {
    throw new Error("Unauthorized: User not authenticated");
  }
  const token = session.user.Token;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
}

type UploadedImage = {
  FileUrl: string;
};
type ServerActionData = Omit<createProductFormType, "Files"> & {
  ProductId: number;
  Files: UploadedImage[];
};
export async function updateProduct(data: ServerActionData) {
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
    Files: data.Files,
    ThumbnailUrl: data.Files[0].FileUrl,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Product/UpdateProduct`,
    {
      method: "PUT",
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

export async function deleteProduct(productId: number) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.Token) {
    throw new Error("Unauthorized: User not authenticated");
  }
  const token = session.user.Token;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Product/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
