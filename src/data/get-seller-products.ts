import { getSellerProducts } from "@/app/(dashboard)/seller/products/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useGetSellerProducts() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";
  const stock = searchParams.get("stock") || "";

  return useQuery({
    queryKey: ["seller-products", page, status, search, stock],
    queryFn: () => getSellerProducts(Number(page), status, search, stock),
  });
}
