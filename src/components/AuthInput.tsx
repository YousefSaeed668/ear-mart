import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface AuthInputProps {
  type: string;
  name?: string;
  ref?: any;
  placeholder: string;
  className?: string;
  accept?: string;
  value?: string;
  [key: string]: any;
}

export function AuthInput({
  type,
  name,
  ref,
  placeholder,
  className,
  accept,
  value,
  ...field
}: AuthInputProps) {
  return (
    <Input
      {...field}
      type={type}
      name={name}
      value={value}
      accept={accept}
      ref={ref}
      placeholder={placeholder}
      className={cn(
        "rounded-none border-t-0 border-x-0 border-b-black",
        className
      )}
    />
  );
}
