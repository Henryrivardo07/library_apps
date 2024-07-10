import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder }) => {
  const [querySearch, setQuerySearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuerySearch(event.target.value);
  };

  const handleSearch = () => {
    onSearch(querySearch);
    navigate(`/search?query=${encodeURIComponent(querySearch)}`);
  };

  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <input
        type="text"
        className="appearance-none bg-transparent border-none w-full text-white placeholder-white mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder={placeholder || "Search..."}
        value={querySearch}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Search
      </button>
    </div>
  );
};

export default Search;
