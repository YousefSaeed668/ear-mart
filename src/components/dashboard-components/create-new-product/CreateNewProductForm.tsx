"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { DashboardCard } from "../DashboardCard";
import { GeneralInfromation } from "./GeneralInfromation";
import { Form } from "@/components/ui/form";
import { Ban, CircleMinus, ShieldX } from "lucide-react";

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

import { TagsInput } from "./TagsInput";
import { Separator } from "@/components/ui/separator";
import { createNewProduct } from "@/app/(dashboard)/seller/add-product/actions";

import { uploadFiles } from "@/lib/helper";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";

export default function CreateNewProductForm() {
  const form = useForm<createProductFormType>({
    resolver: zodResolver(createProductFormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    setError,
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
    if (data.Files.length === 0) {
      setError("Files", { message: "Please upload at least one image" });
      return;
    }

    const uploadedImages = await uploadFiles(data.Files);
    const { Files, ...dataWithoutFiles } = data;
    const response = await createNewProduct({
      ...dataWithoutFiles,
      Files: uploadedImages,
    });
    if (response.Success) {
      toast.success("Product created successfully", {
        position: "top-right",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }
    if (response.status && response.status !== 200) {
      if (response.errors) {
        Object.entries(response.errors).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            setError(key as any, { message: value[0] });
          }
        });
        toast.error("Check The Form Values", {
          position: "top-right",
          icon: <ShieldX className="h-6 w-6 mr-3" />,
          style: {
            backgroundColor: "#cc3300",
            color: "white",
          },
        });
      } else {
        console.error("Error:", response.title || "An error occurred");
      }
      return;
    }
  }
  return (
    <>
      <DashboardCard className="mt-10 font-poppins">
        <h2>
          General Information <span className="text-[#F43F5E]">*</span>
        </h2>
        <p className="text-textGrayColor ">
          To start selling, all you need is a name and a price.
        </p>
        <Form {...form}>
          <form id="create-product-form" onSubmit={handleSubmit(onsubmit)}>
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
                      title={
                        index === 0 ? undefined : `Collection ${index + 1}`
                      }
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
            <UploadImages
              error={errors.Files?.message}
              onOrderChange={handleFileOrderChange}
            />
          </form>
        </Form>
      </DashboardCard>
      <div className="flex  justify-center mb-12">
        <LoadingButton
          loading={isSubmitting}
          form="create-product-form"
          className="px-14 py-6 rounded-md mt-12"
        >
          Confirm
        </LoadingButton>
      </div>
    </>
  );
}
