"use client";
import React from "react";
import { Button } from "../button";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { useAllShops } from "@/hooks/useAllShops";
import QueueCard from "../QueueCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { isLoading, filteredShops, searchTerm, setSearchTerm } = useAllShops();

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="min-h-full w-full absolute bg-white z-[9999] top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="mb-6 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm"
            onClick={handleClose}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold text-gray-700">
            Search Barber Shops
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm invisible"
          >
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex items-center border py-3 px-4 rounded-full w-full">
          <span className="mr-2 text-gray-500">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="outline-none flex-1 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mt-5 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search Result</h2>
            <div className="text-sm text-yellow-600 font-semibold">
              {filteredShops.length} founds
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center mt-10">
              <Loader2 size={26} className="animate-spin" />
            </div>
          ) : filteredShops.length > 0 ? (
            <>
              <QueueCard shopData={filteredShops} />
            </>
          ) : (
            <p className="text-center mt-2">No barber shop found</p>
          )}
        </div>
      </div>
    </div>
  );
}
