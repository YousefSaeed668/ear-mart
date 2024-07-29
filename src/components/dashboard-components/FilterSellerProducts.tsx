"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

export function FilterSellerProducts() {
  const searchParamsHook = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState({
    search: searchParamsHook.get("search") || "",
    status: searchParamsHook.get("status") || "",
    stock: searchParamsHook.get("stock") || "",
  });
  const [debouncedSearch] = useDebounce(params.search, 300);
  useEffect(() => {
    const searchParams = new URLSearchParams({
      ...(debouncedSearch && { search: debouncedSearch.trim() }),
      ...(params.status &&
        params.status !== "all" && { status: params.status }),
      ...(params.stock && params.stock !== "all" && { stock: params.stock }),
    });
    router.push(`?${searchParams.toString()}`);
  }, [params, debouncedSearch, router]);
  return (
    <div>
      <h1 className="text-2xl md:text-4xl mb-4 font-bold">Product list</h1>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-[250px] relative sm:w-[300px]">
          <label
            htmlFor="search"
            className="absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2 text-textGrayColor"
          >
            Product Name
          </label>
          <Input
            id="search"
            className="w-full pl-32 pr-10"
            placeholder="Search"
            value={params.search}
            onChange={(e) =>
              setParams((prevState) => ({
                ...prevState,
                search: e.target.value,
              }))
            }
          />
          <Search className="absolute top-1/2 -translate-y-1/2 right-2 text-textGrayColor" />
        </div>

        <Select
          onValueChange={(value) =>
            setParams((prevState) => ({
              ...prevState,
              status: value,
            }))
          }
          value={params.status}
        >
          <SelectTrigger className="w-[250px] sm:w-[300px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            setParams((prevState) => ({
              ...prevState,
              stock: value,
            }))
          }
          value={params.stock}
        >
          <SelectTrigger className="w-[250px] sm:w-[300px]">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="instock">In-stock</SelectItem>
            <SelectItem value="out-of-stock">Out Of stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
