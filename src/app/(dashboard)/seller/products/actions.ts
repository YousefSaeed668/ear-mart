import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
interface ProductVariant {
  Color: string;
  Size: string;
  Price: number;
  StockQuantity: number;
}

interface File {
  FileUrl: string;
}

interface Product {
  ProductId: number;
  ProductTitle: string;
  SubTitle: string;
  Slug: string;
  ProductDescription: string;
  DiscountPercent: number;
  ThumbnailUrl: string;
  Quantity: number;
  CategoryName: string;
  SubCategoryNames: string[];
  ProductVariants: ProductVariant[];
  ProductStatus: string;
  Files: File[];
}

interface ProductsResponse {
  Items: Product[];
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
  TotalItems: number;
}

export async function getSellerProducts(
  page: number,
  status: string,
  search: string,
  stock: string
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.Token) {
    throw new Error("Unauthorized: User not authenticated");
  }
  const token = session.user.Token;

  const response = await fetch(
    `https://ear-mart.runasp.net/api/Product/ProductFilter?PageNumber=${page}&PageSize=16&isActive=${status}&searchString=${search}&quantity=${stock}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    return {
      success: false,
      data: {
        Items: [],
        PageNumber: 0,
        PageSize: 0,
        TotalPages: 0,
        TotalItems: 0,
      },
      message: response.statusText,
    };
  }
  const data: ProductsResponse = await response.json();

  return {
    success: true,
    data,
    message: "Products fetched successfully",
  };
}
