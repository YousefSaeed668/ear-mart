import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getSellerProducts } from "./actions";

import { SellerProductsTable } from "@/components/dashboard-components/SellerProductsTable";
import { FilterSellerProducts } from "@/components/dashboard-components/FilterSellerProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams: { page: number; status: string; search: string; stock: string };
}) {
  const queryClient = new QueryClient();
  const page = searchParams.page || "1";
  const status = searchParams.status || "";
  const search = searchParams.search || "";
  const stock = searchParams.stock || "";

  await queryClient.prefetchQuery({
    queryKey: ["seller-products", page, status, search, stock],
    queryFn: () => getSellerProducts(Number(page), status, search, stock),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-start justify-between w-full mb-5 mt-10">
        <FilterSellerProducts />
        <Button asChild>
          <Link href="/seller/add-product" className="uppercase">
            Add New Product
          </Link>
        </Button>
      </div>
      <SellerProductsTable />
    </HydrationBoundary>
  );
}
