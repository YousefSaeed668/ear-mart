import { QueryClient } from "@tanstack/react-query";
import { getProductById } from "./actions";
import CreateNewProductForm from "@/components/dashboard-components/create-new-product/CreateNewProductForm";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [`product${productId}`],
    queryFn: () => getProductById(productId),
  });
  if (!queryClient.getQueryData([`product${productId}`])) {
    return (
      <div className="flex justify-center h-screen">
        <div className="mt-32 flex flex-col items-center">
          <Image
            src="/oops.svg"
            width={400}
            height={400}
            alt="product-not-found"
          />
          <p className="text-4xl font-semibold">Product Not Found</p>
          <Button asChild className="mt-4">
            <Link href="/seller/products" className="flex items-start gap-2">
              <ArrowLeft />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <CreateNewProductForm
      initalData={queryClient.getQueryData([`product${productId}`])}
    />
  );
}
