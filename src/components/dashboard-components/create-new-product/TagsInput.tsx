"use client";

import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState, useRef, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";

export function TagsInput() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="SubCategoryNames"
      render={({ field }) => (
        <FormItem className="w-full md:w-[40%] ">
          <FormLabel>
            Sub Categories <span className="text-[#F43F5E]">*</span>
          </FormLabel>
          <FormControl>
            <Tags
              placeholder="Add sub category"
              value={field.value || []}
              onChange={(newValue) => field.onChange(newValue)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface TagsProps {
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
}

function Tags({ placeholder, value, onChange }: TagsProps) {
  const { setError, clearErrors } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addValue = (item: string) => {
    if (item.length <= 30) {
      if (!value.includes(item)) {
        onChange([...value, item]);
        clearErrors("SubCategoryNames"); // Clear the error when a valid tag is added
      }
      setInputValue("");
    } else {
      setError("SubCategoryNames", {
        message: "Tags cannot be more than 30 characters",
      });
    }
  };

  const removeValue = (item: string) => {
    onChange(value.filter((val) => val !== item));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addValue(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeValue(value[value.length - 1]);
    }
  };

  return (
    <div
      className="flex flex-wrap items-center border rounded-md p-2 focus-within:ring-4 focus-within:ring-primaryColor focus-within:ring-offset-0 min-h-[40px] overflow-x-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((item, index) => (
        <Badge
          key={index}
          className="bg-darkBlueColor text-white m-1 text-sm flex-shrink-0 rounded-lg"
        >
          {item}
          <button
            type="button"
            className="ml-1 text-white hover:text-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              removeValue(item);
            }}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm min-w-[50px]"
        placeholder={value.length === 0 ? placeholder : ""}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim()) {
            addValue(inputValue.trim());
          }
        }}
      />
    </div>
  );
}
