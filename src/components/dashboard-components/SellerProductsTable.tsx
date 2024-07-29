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
import { Edit } from "lucide-react";
import Link from "next/link";
import { Pagination } from "../Pagination";
import { FilterSellerProducts } from "./FilterSellerProducts";
import { Button } from "../ui/button";
import { Fragment } from "react";

export function SellerProductsTable() {
  const { data, isPending } = useGetSellerProducts();

  if (isPending) {
    //Todo : Add a loading Skelton
    return <DashboardCard className="px-6 py-4">Loading...</DashboardCard>;
  }
  if (data?.Items.length === 0)
    return (
      <DashboardCard className="px-6 py-4">{"No Product Found"}</DashboardCard>
    );
  return (
    <div className="w-full max-[1100px]:w-fit">
      <DashboardCard className="font-poppins min-h-screen ">
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
          <Accordion type="single" collapsible className="col-span-9">
            {data?.Items.map((product) => (
              <AccordionItem
                value={`product-${product.ProductId}`}
                key={product.ProductId}
              >
                <AccordionTrigger className=" py-6 w-full grid grid-cols-[30px,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 col-span-9 text-start font-medium">
                  <div>{product.ProductId}</div>
                  <div className="truncate">{product.ProductTitle}</div>
                  <div>
                    {Math.max(
                      ...product.ProductVariants.map((variant) => variant.Price)
                    )}{" "}
                    EGP
                  </div>
                  <div>
                    {product.DiscountPercent > 0
                      ? `${product.DiscountPercent}% off`
                      : "No offers"}
                  </div>
                  <div>{product.Quantity}</div>
                  <div className="text-green-500">In Stock</div>
                  <div>{product.CategoryName}</div>
                  <div>
                    <Link href={`/seller/edit-product/${product.ProductId}`}>
                      <Edit />
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
        numberOfResults={data?.TotalItems}
        numberOfPages={data?.TotalPages}
        currentPage={data?.PageNumber}
      />
    </div>
  );
}
