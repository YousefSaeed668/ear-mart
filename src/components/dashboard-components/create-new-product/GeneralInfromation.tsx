import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function GeneralInfromation() {
  const { register, control, watch } = useFormContext();

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6 ">
        <FormField
          control={control}
          name="ProductTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title <span className="text-[#F43F5E]">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Business Name" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="SubTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Business Name" {...field} type="text" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="ProductDescription"
          render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <FormLabel>
                Description <span className="text-[#F43F5E]">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Business Name" {...field} type="text" />
              </FormControl>
              <FormDescription>
                Give your product a short and clear title. <br />
                50-60 characters is the recommended length for search engines.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div></div>
    </>
  );
}