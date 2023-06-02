"use client";
import {
  GetCategoryDocument,
  GetCategoryQuery,
  GetCategoryQueryVariables,
} from "@/generated";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filterTerm: string;
  setFilterTerm: (filterTerm: string) => void;
  lastFilter: string;
  setLastFilter: (filterTerm: string) => void;
}

function SearchInput({
  searchTerm,
  setSearchTerm,
  filterTerm,
  setFilterTerm,
  lastFilter,
  setLastFilter,
}: SearchInputProps) {
  const { data, error, loading } = useQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >(GetCategoryDocument, {});
  // const categories = [
  //   "Adventure",
  //   "Arcade",
  //   "Puzzle",
  //   "Girls",
  //   "Action",
  //   "3D",
  //   "Hypercasual",
  //   "Racing",
  //   "Boys",
  //   "Shooting",
  //   "Clicker",
  //   "Bejeweled",
  //   "Baby",
  // ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    lastFilter === "none" ? setLastFilter("all") : "";
    e.target.value !== "" ? setFilterTerm(lastFilter) : setFilterTerm("none");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTerm(e.target.value);
    setLastFilter(e.target.value);
    e.target.value === "none" ? setSearchTerm("") : "";
  };

  return (
    <>
      <div className="bg-[#2e2e52] w-[99%] rounded-md flex items-center justify-center p-2">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-4 gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-[#1a1a2e] text-[#cbf7ed] pl-10 pr-4 py-2 border-2 border-[#44475a] rounded-md focus:border-[#8be9fd] focus:outline-none w-[13rem] transition-all duration-300 ease-in-out"
            />
            <FiSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#8be9fd]" />
          </div>
          <div className="relative">
            <select
              onChange={handleFilterChange}
              value={filterTerm === "" ? "" : filterTerm}
              className="bg-[#1a1a2e] text-[#cbf7ed] pl-10 pr-4 py-2 border-2 border-[#44475a] rounded-md focus:border-[#8be9fd] focus:outline-none w-[12rem] transition-all duration-300 ease-in-out"
            >
              <option value="none">None</option>
              <option value="">All</option>
              {data?.facets.categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FiFilter className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#8be9fd]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchInput;
