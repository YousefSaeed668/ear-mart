import { CreateNewProductForm } from "@/components/dashboard-components/create-new-product/CreateNewProductForm";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
          Add new product
        </h1>
        <Button className="uppercase" variant="outline">
          back to products list
        </Button>
      </div>
      <CreateNewProductForm />
    </div>
  );
}
