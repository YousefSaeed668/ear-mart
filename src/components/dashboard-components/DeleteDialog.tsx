import { deleteProduct } from "@/app/(dashboard)/seller/edit-product/[productId]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteDialog({
  children,
  className,
  title,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  id: number;
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    const response = await deleteProduct(id);
    setIsOpen(false);
    if (response.Success) {
      toast.success("Product deleted successfully");
      router.push("/seller/products");
    }
    if (!response.Success) {
      toast.error(response.Message);
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[calc(100%-80px)]  sm:max-w-[600px] md:max-w-[725px] lg:md:max-w-[1000px]",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl sm:text-4xl font-inter w-[80%] md:w-[50%] mx-auto font-bold">
            {title.split("/n")[0]} <br />
            {title.split("/n")[1]}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="mt-12">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-[#EA4335] uppercase px-9 py-4 rounded-md hover:bg-[#D93025]"
            onClick={handleClick}
          >
            Sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
