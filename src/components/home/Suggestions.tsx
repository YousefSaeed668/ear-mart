import { MaxWidth } from "../MaxWidth";
import ProductCard from "../ProductCard";

export function Suggestions() {
  return (
    <MaxWidth className="my-28">
      <div className="grid grid-cols-4 gap-4">
        <ProductCard />
      </div>
    </MaxWidth>
  );
}
