import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createProductFormType } from "@/lib/validation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { TagsInput } from "./TagsInput";
import { SpecificationsTableInput } from "./SpecificationsTableInput";

export function ProductSpecifications({
  title,
  index,
}: {
  title?: string;
  index: number;
}) {
  const { control, setValue, watch } = useFormContext<createProductFormType>();
  const isDiscountChecked = watch(`ProductVariants.${index}.Discount`);

  // Clear DiscountPercent when Discount is unchecked
  useEffect(() => {
    if (!isDiscountChecked) {
      setValue(`ProductVariants.${index}.DiscountPercent`, "");
    }
  }, [isDiscountChecked, setValue, index]);

  return (
    <div className="my-10">
      {title && <h2 className="font-bold text-3xl mb-7">{title} :</h2>}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        <div>
          <div className="mb-5">
            <h3 className="font-medium">Stock quantity</h3>
            <p className="text-textGrayColor">
              Number of product that you have
            </p>
          </div>
          <FormField
            control={control}
            name={`ProductVariants.${index}.StockQuantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Available quantity <span className="text-[#F43F5E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="StockQuantity" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <div className="mb-5">
            <h3 className="font-medium">Regular price</h3>
            <p className="text-textGrayColor">The product&apos;s main price</p>
          </div>
          <FormField
            control={control}
            name={`ProductVariants.${index}.Price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price by EGP <span className="text-[#F43F5E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="mb-5">
              <h3 className="font-medium">Make an Offter</h3>
              <p className="text-textGrayColor">Make offer on price</p>
            </div>
            <FormField
              control={control}
              name={`ProductVariants.${index}.Discount`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name={`ProductVariants.${index}.DiscountPercent`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Offer percentage <span className="text-[#F43F5E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Business Name"
                    disabled={!isDiscountChecked}
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="mt-8 mb-5">
        <h2>Product Options</h2>
        <p className="text-textGrayColor">
          Used for products that come in diffenet variations
        </p>
      </div>
      <div className="relative rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-white bg-primaryColor">
              <th className="border border-gray-300 sm:w-64 flex-shrink py-2 text-start pl-2">
                Option title
              </th>
              <th className="border border-gray-300  py-2 min-w-[60%] text-start pl-2">
                Variations
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 pl-2 font-medium">Color</td>
              <td className="border border-gray-300 ">
                <FormField
                  control={control}
                  name={`ProductVariants.${index}.Color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SpecificationsTableInput
                          placeholder="Color"
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 pl-2 font-medium">Sizes</td>
              <td className="border border-gray-300 ">
                <FormField
                  control={control}
                  name={`ProductVariants.${index}.Size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SpecificationsTableInput
                          placeholder="Size"
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="absolute inset-0 pointer-events-none rounded-lg border border-gray-300"></div>
      </div>
    </div>
  );
}
