import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const SearchInput = React.memo(({ searchTerm, onChange } :{searchTerm: string , onChange:(e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search email..."
          className="pl-8 w-[200px]"
          value={searchTerm}
          onChange={onChange}
        />
      </div>
    );
});
  export default SearchInput