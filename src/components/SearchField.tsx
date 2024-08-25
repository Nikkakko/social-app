"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

interface SearchFieldProps {}

const SearchField: React.FC<SearchFieldProps> = ({}) => {
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    if (!query) return;
    router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative"
      method="GET"
      action="/search"
    >
      <Input name="query" placeholder="Search..." className="w-full pe-10" />
      <SearchIcon
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-muted-foreground"
        size={20}
      />
    </form>
  );
};

export default SearchField;
