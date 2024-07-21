"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface TagsInputProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
export function TagsInput({
  placeholder,
  value,
  onChange,
  onRemove,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <div className="flex items-center ">
      <div className="flex gap-1 flex-wrap flex-grow max-w-80">
        {value.map((item, index) => (
          <Badge
            key={index}
            className="text-white bg-darkBlueColor text-base rounded-md px-1.5"
          >
            {item}
            <button
              type="button"
              className="ml-2 rounded-full outline-none p-0 h-fit "
              onClick={() => onRemove(item)}
            >
              <X className="h-4 w-4" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        className="border-none rounded-none  bg-transparent focus-visible:ring-0  focus-visible:ring-offset-0"
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (inputValue.trim().length > 0) {
              addValue(inputValue);
            }
            return;
          }
        }}
      />
    </div>
  );
}
