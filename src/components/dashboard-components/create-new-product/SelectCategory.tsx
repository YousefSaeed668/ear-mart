import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllCategories } from "./action";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export function SelectCategory() {
  const [categories, setCategories] = useState<Category[]>();
  const {  control } = useFormContext();
  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await getAllCategories();

        setCategories(categories);
      } catch (error) {}
    }
    getCategories();
  }, []);
  return (
    <FormField
      control={control}
      name="Category"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select A Category"
                  className="placeholder:text-lg placeholder:font-medium"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="font-medium">Category</SelectLabel>
                  {categories &&
                    categories.map((category) => (
                      <SelectItem
                        className="font-medium text-lg"
                        key={category.CategoryName}
                        value={category.CategoryName}
                      >
                        {category.CategoryName}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
