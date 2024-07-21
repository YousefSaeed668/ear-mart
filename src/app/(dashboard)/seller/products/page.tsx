import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <Button className="w-fit">
      <Link href="/seller/add-product">Add New Product</Link>
    </Button>
  );
}
