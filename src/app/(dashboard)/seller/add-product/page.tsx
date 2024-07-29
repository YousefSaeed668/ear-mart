import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";

const CreateNewProductForm = dynamic(
  () =>
    import(
      "@/components/dashboard-components/create-new-product/CreateNewProductForm"
    ),
  { ssr: false }
);

export default function page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
          Add new product
        </h1>
        <Button className="uppercase" variant="outline">
          <Link href="/seller/products">back to products list</Link>
        </Button>
      </div>
      <CreateNewProductForm />
    </div>
  );
}
