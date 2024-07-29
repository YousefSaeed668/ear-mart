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
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";

type Status = "all" | "accepted" | "pending" | "rejected";
type Stock = "all" | "in-stock" | "out-of-stock";

export function FilterSellerProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(search, 300);

  const [status, setStatus] = useState<Status | "">(
    (searchParams.get("status") as Status) || ""
  );
  const [stock, setStock] = useState<Stock | "">(
    (searchParams.get("stock") as Stock) || ""
  );

  const updateURL = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    if (status && status === "all") {
      params.delete("status");
      params.set("page", "1");
    } else {
      params.set("status", status);
    }

    if (stock && stock === "all") {
      params.delete("stock");
      params.set("page", "1");
    } else {
      params.set("stock", stock);
    }

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "", { scroll: false });
  }, [debouncedSearch, status, stock, router, searchParams]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handleStatusChange = (value: Status) => {
    setStatus(value === "all" ? "" : value);
  };

  const handleStockChange = (value: Stock) => {
    setStock(value === "all" ? "" : value);
  };

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-1/2 -translate-y-1/2 right-2 text-textGrayColor" />
        </div>

        <Select onValueChange={handleStatusChange} value={status || "all"}>
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
        <Select onValueChange={handleStockChange} value={stock || "all"}>
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
