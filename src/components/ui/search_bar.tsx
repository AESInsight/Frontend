import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "../fields/input_field";

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State for input value

    return (
        <div className="relative w-65">
            <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <InputField
                placeholder="Search for data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-10 p-2 text-black bg-white border border-sky-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 mt-4"
            />
        </div>
    );
};

export default SearchBar;