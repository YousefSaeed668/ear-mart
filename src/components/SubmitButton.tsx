"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/Spinner";

export function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending ? <Spinner /> : children}
    </Button>
  );
}
