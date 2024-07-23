import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function SpecificationsTableInput({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  const { setValue } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const [badge, setBadge] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim().length > 0) {
      e.preventDefault();
      setBadge(inputValue);
      setValue(name, inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {badge ? (
        <Badge className="flex items-center text-white my-1 ml-1 bg-darkBlueColor text-base rounded-md px-2 py-1">
          {badge}
          <button
            type="button"
            className="ml-2 rounded-full outline-none  p-0 h-fit "
            onClick={() => {
              setBadge("");
              setValue(name, "");
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </Badge>
      ) : (
        <Input
          placeholder={placeholder}
          className="border-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setBadge(inputValue);
            setValue(name, inputValue);
            setInputValue("");
          }}
        />
      )}
    </div>
  );
}
