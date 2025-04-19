"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/store?title=${search}`);
  };

  return (
    <>
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="text"
        placeholder=" ... جستجو"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSearch}
      >
        جستجو
      </button>
    </>
  );
};

export default Search;
