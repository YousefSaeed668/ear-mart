"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { DashboardCard } from "../DashboardCard";
import { GeneralInfromation } from "./GeneralInfromation";
import { Form } from "@/components/ui/form";
import { CircleMinus } from "lucide-react";

import { ProductSpecifications } from "./ProductSpecifications";
import { CirclePlus } from "lucide-react";
import {
  createProductFormSchema,
  createProductFormType,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectCategory } from "./SelectCategory";
import { UploadImages } from "./UploadImages";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { TagsInput } from "./TagsInput";
import { Separator } from "@/components/ui/separator";

export default function CreateNewProductForm() {
  const form = useForm<createProductFormType>({
    resolver: zodResolver(createProductFormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form;
  const handleFileOrderChange = useCallback(
    (orderedFiles: File[]) => {
      setValue("Files", orderedFiles);
    },
    [setValue]
  );
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ProductVariants",
  });
  async function onsubmit(data: createProductFormType) {
    const cleanedData = {
      ...data,
      ProductVariants: data.ProductVariants.map((variant) => {
        if (!variant.Discount) {
          const { Discount, DiscountPercent, ...rest } = variant;
          return rest;
        }
        return variant;
      }),
    };
    console.log(cleanedData);
  }
  return (
    <DashboardCard className="mt-10 font-poppins">
      <h2>
        General Information <span className="text-[#F43F5E]">*</span>
      </h2>
      <p className="text-textGrayColor ">
        To start selling, all you need is a name and a price.
      </p>
      <Form {...form}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <GeneralInfromation />
          <h3 className="text-center font-bold text-primaryColor text-2xl my-7">
            Available Collections
          </h3>
          <div>
            <ProductSpecifications title="Collection 1" index={0} />
            {fields.map((field, index) => {
              if (index === 0) return null;
              return (
                <>
                  <ProductSpecifications
                    key={field.id}
                    title={index === 0 ? undefined : `Collection ${index + 1}`}
                    index={index}
                  />

                  <CircleMinus
                    className="mt-3 -mr-2 cursor-pointer ml-auto
                    "
                    onClick={() => remove(index)}
                  />
                </>
              );
            })}
            <CirclePlus
              className="-ml-2 -mt-5 cursor-pointer"
              onClick={() =>
                append({
                  Discount: false,
                  Color: "",
                  Size: "",
                  Price: "",
                  StockQuantity: "",
                  DiscountPercent: "",
                })
              }
            />
          </div>
          <Separator className="my-6" />
          <div className="flex justify-between flex-wrap items-center mt-10">
            <TagsInput />
            <div className="flex gap-4 items-center mt-12">
              <h2 className="text-xl font-semibold">
                Select Product Category :
              </h2>
              <SelectCategory />
            </div>
          </div>
          <UploadImages onOrderChange={handleFileOrderChange} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DashboardCard>
  );
}
