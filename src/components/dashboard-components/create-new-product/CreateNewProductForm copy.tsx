"use client";
import { useForm } from "react-hook-form";
import { DashboardCard } from "../DashboardCard";
import { GeneralInfromation } from "./GeneralInfromation";
import { Form } from "@/components/ui/form";

import { ProductSpecifications } from "./ProductSpecifications";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import {
  createProductFormSchema,
  createProductFormType,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateNewProductForm() {
  const form = useForm<createProductFormType>({
    resolver: zodResolver(createProductFormSchema),
  });
  const [collections, setCollections] = useState(0);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  async function onsubmit(data: any) {
    console.log(data);
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
            <ProductSpecifications />
            {Array.from({ length: collections }).map((_, i) => (
              <ProductSpecifications key={i} title={`Collection ${i + 2}`} />
            ))}
            <CirclePlus
              className="mt-3 -ml-2 cursor-pointer"
              onClick={() => {
                setCollections((collections) => collections + 1);
              }}
            />
          </div>
        </form>
      </Form>
    </DashboardCard>
  );
}
