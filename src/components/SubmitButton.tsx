"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/Spinner";
interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  form?: string;
}

export function SubmitButton({ children, className, form }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" form={form} className={className} disabled={pending}>
      {pending ? <Spinner /> : children}
    </Button>
  );
}
