// Todo: Implement loading state when scaling
"use client";

import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/ui/searchBar";
import { categories, haircuts } from "@/data/haircuts";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Haircut = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [filteredHaircuts, setFilteredHaircuts] = useState(haircuts);

  useEffect(() => {
    if (type) {
      setFilteredHaircuts(
        haircuts.filter((haircut) => haircut.category === type)
      );
    } else {
      setFilteredHaircuts(haircuts);
    }
  }, [type]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-24">
      <SearchBar />
      <div
        className="max-h-24 overflow-y-auto flex gap-2 my-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Link href={"/dashboard/haircut"}>
          <Badge
            variant={"secondary"}
            className={
              !type
                ? "bg-yellow-700 text-yellow-100 py-1 px-4 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                : "py-1 px-4 rounded-lg cursor-pointer bg-gray-200"
            }
          >
            All
          </Badge>
        </Link>
        {categories.map((category, idx) => (
          <Link key={idx} href={`?type=${category.category}`}>
            <Badge
              variant={"secondary"}
              className={
                type === category.category
                  ? "bg-yellow-700 text-yellow-100 py-1 px-4 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                  : "py-1 px-4 rounded-lg cursor-pointer bg-gray-200"
              }
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
      {filteredHaircuts.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-4">
          {filteredHaircuts.map((haircut) => (
            <div
              key={haircut.name}
              className="mb-4 break-inside-avoid rounded-lg overflow-hidden bg-white shadow"
            >
              <img
                src={haircut.imageUrl}
                alt={haircut.name}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600">No haircuts found.</p>
        </div>
      )}
    </div>
  );
};

export default Haircut;
