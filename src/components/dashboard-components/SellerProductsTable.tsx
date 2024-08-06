"use client";
import { useGetSellerProducts } from "@/data/get-seller-products";
import { DashboardCard } from "./DashboardCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import { AlertCircle, Edit } from "lucide-react";
import Link from "next/link";
import { Pagination } from "../Pagination";
import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function SellerProductsTable() {
  const { data, isPending, isFetching } = useGetSellerProducts();

  if (isFetching) {
    return (
      <DashboardCard className="px-6 py-4">
        <ProductListSkeleton />
      </DashboardCard>
    );
  }

  if (!data?.success)
    return (
      <DashboardCard className="px-6 py-4">
        <div className="w-full p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{data?.message}</p>
          <div className="flex items-center gap-5 justify-center">
            <Button
              className="px-8 py-6  rounded-md  transition-colors"
              asChild
            >
              <Link href="/seller/products" className="uppercase">
                Reset Filters
              </Link>
            </Button>
            <Button asChild className="py-6 rounded-md">
              <Link href="/seller/add-product" className="uppercase">
                Add New Product
              </Link>
            </Button>
          </div>
        </div>
      </DashboardCard>
    );
  return (
    <div className="w-full max-[1100px]:w-fit">
      <DashboardCard className="font-poppins min-h-screen ">
        <div className="grid grid-cols-[30px,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 p-4 min-w-[800px]">
          <div></div>
          <div className="text-textGrayColor text-center">Product ID</div>
          <div className="text-textGrayColor text-center">Product Name</div>
          <div className="text-textGrayColor text-center">Price</div>
          <div className="text-textGrayColor text-center">Offers</div>
          <div className="text-textGrayColor text-center">Inventory</div>
          <div className="text-textGrayColor text-center">Status</div>
          <div className="text-textGrayColor text-center">Category</div>
          <div className="text-textGrayColor text-center">Edit</div>
          <Separator className="col-span-9" />
          <Accordion type="single" collapsible className="col-span-9">
            {data?.data.Items.map((product) => (
              <AccordionItem
                value={`product-${product.ProductId}`}
                key={product.ProductId}
              >
                <AccordionTrigger className=" py-6 w-full grid grid-cols-[30px,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 col-span-9 text-start font-medium">
                  <div className="text-center">{product.ProductId}</div>
                  <div className="truncate text-center">
                    {product.ProductTitle}
                  </div>
                  <div className="text-center">
                    {Math.max(
                      ...product.ProductVariants.map((variant) => variant.Price)
                    )}{" "}
                    EGP
                  </div>
                  <div className="text-center">
                    {product.DiscountPercent > 0
                      ? `${product.DiscountPercent}% off`
                      : "No offers"}
                  </div>
                  <div className="text-center">{product.Quantity}</div>
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full `}
                      style={{
                        backgroundColor:
                          product.ProductStatus === "accepted"
                            ? "#03fb75"
                            : product.ProductStatus === "rejected"
                            ? "#fb0303"
                            : product.ProductStatus === "pending"
                            ? "#f0ad4e"
                            : "#d3d3d3",
                      }}
                    />
                    <span className="ml-2 capitalize ">
                      {product.ProductStatus}
                    </span>
                  </div>
                  <div className="text-center">{product.CategoryName}</div>
                  <div>
                    <Link
                      href={`/seller/edit-product/${product.ProductId}`}
                      className=""
                    >
                      <Edit className="mx-auto" />
                    </Link>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-6 text-base">
                  <h3 className="font-bold text-lg mb-4">
                    Product Name: {product.ProductTitle}
                  </h3>

                  <h3 className="font-bold text-lg">Product Variants :</h3>
                  <div className="border mt-3 grid grid-cols-4 p-5 rounded-lg">
                    <div className="font-bold pb-3">Color</div>
                    <div className="font-bold pb-3">Size</div>
                    <div className="font-bold pb-3">Price</div>
                    <div className="font-bold pb-3">Stock Quantity</div>
                    <Separator className="col-span-4" />
                    {product.ProductVariants.map((variant) => (
                      <Fragment key={variant.Color}>
                        <div className="py-3">{variant.Color}</div>
                        <div className="py-3">{variant.Size}</div>
                        <div className="py-3">{variant.Price} EGP</div>
                        <div className="py-3">{variant.StockQuantity}</div>
                      </Fragment>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DashboardCard>
      <Pagination
        numberOfResults={data?.data?.TotalItems}
        numberOfPages={data?.data.TotalPages}
        currentPage={data?.data.PageNumber}
      />
    </div>
  );
}
const ProductListSkeleton = () => {
  return (
    <div className="w-full max-[1100px]:w-fit">
      <div className="font-poppins min-h-screen">
        <div className="grid grid-cols-[30px,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 p-4 min-w-[800px]">
          <div></div>
          <div className="text-textGrayColor">Product ID</div>
          <div className="text-textGrayColor">Product Name</div>
          <div className="text-textGrayColor">Price</div>
          <div className="text-textGrayColor">Offers</div>
          <div className="text-textGrayColor">Inventory</div>
          <div className="text-textGrayColor">Status</div>
          <div className="text-textGrayColor">Category</div>
          <div className="text-textGrayColor">Edit</div>
          <Separator className="col-span-9" />
          <Accordion type="single" collapsible className="col-span-9 w-full">
            {[...Array(8)].map((_, index) => (
              <AccordionItem value={`skeleton-${index}`} key={index}>
                <AccordionTrigger className="py-6 w-full grid grid-cols-[30px,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 col-span-9 text-start font-medium">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                </AccordionTrigger>
                <AccordionContent className="mt-6 text-base">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-3" />
                  <div className="border mt-3 grid grid-cols-4 p-5 rounded-lg">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-4 w-16 mb-3" />
                    <Skeleton className="h-4 w-16 mb-3" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Separator className="col-span-4" />
                    {[...Array(3)].map((_, variantIndex) => (
                      <Fragment key={variantIndex}>
                        <Skeleton className="h-4 w-16 my-3" />
                        <Skeleton className="h-4 w-12 my-3" />
                        <Skeleton className="h-4 w-16 my-3" />
                        <Skeleton className="h-4 w-12 my-3" />
                      </Fragment>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  );
};
