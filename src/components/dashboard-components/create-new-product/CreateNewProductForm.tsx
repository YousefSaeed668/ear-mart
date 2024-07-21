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
import { Button } from "@/components/ui/button";

export function CreateNewProductForm() {
  const form = useForm<createProductFormType>({
    resolver: zodResolver(createProductFormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

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
          <Button type="submit" className="mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </DashboardCard>
  );
}
