import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filterTerm, setFilterTerm] = useState<string>("none");
  const [lastFilter, setLastFilter] = useState<string>("");
  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
        lastFilter={lastFilter}
        setLastFilter={setLastFilter}
      />
      {(searchTerm !== "" || filterTerm !== "none") && (
        <SearchResults searchTerm={searchTerm} filterTerm={filterTerm} />
      )}
    </>
  );
}

export default Search;
