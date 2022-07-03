import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Search = ({ search }: { search: any }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <div className="search-continer">
      <input
        onChange={handleSearch}
        placeholder="Search By Name"
        onKeyDown={(e: React.KeyboardEvent) =>
          e.key === "Enter" && search(query)
        }
      />
      <FontAwesomeIcon onClick={() => search(query)} icon={faSearch} />
    </div>
  );
};

export default Search;
