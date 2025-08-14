import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center border py-3 bg-gray-50 px-4 rounded-full w-full">
      <span className="mr-2 text-gray-500">
        <Search size={20} />
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="outline-none flex-1 bg-transparent"
      />
    </div>
  );
};

export default SearchBar;
