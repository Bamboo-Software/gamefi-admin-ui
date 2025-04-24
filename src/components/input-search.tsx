import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const SearchInput = React.memo(({ searchTerm, onChange } :{searchTerm: string, onChange:(e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
      <div className="relative">
        <Search className={cn("absolute left-2 top-2.5 h-4 w-4 text-muted-foreground")} />
        <Input
          placeholder="Search user..."
          className="pl-8 w-[200px]"
          value={searchTerm}
          onChange={onChange}
        />
      </div>
    );
});
  export default SearchInput