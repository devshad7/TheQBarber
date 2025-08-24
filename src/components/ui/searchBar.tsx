"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import SearchModal from "./modal/SearchModal";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center border py-3 bg-gray-50 px-4 rounded-full w-full">
        <span className="mr-2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          onClick={() => setIsModalOpen(true)}
          type="text"
          placeholder="Search..."
          className="outline-none flex-1 bg-transparent"
        />
      </div>
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SearchBar;
