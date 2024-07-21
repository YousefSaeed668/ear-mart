import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function ProductSpecifications({ title }: { title?: string }) {
  const { control } = useFormContext();

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
            name="StockQuantity"
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
            name="Price"
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
              name="Businessname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="radio" {...field} type="checkbox" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="DiscountPercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Offer percentage <span className="text-[#F43F5E]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Business Name" {...field} type="text" />
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
              <th className="border border-gray-300 w-64 py-2 text-start pl-2">
                Option title
              </th>
              <th className="border border-gray-300  py-2 text-start pl-2">
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
                  name="Color"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="text"
                          {...field}
                          type="text"
                          className="border-none rounded-none  focus-visible:ring-0  focus-visible:ring-offset-0"
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
                  name="Size"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="text"
                          {...field}
                          type="text"
                          className="border-none rounded-none  focus-visible:ring-0  focus-visible:ring-offset-0"
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
