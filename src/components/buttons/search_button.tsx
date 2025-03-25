import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/search")} 
        className="bg-gray-200 p-6 rounded-lg shadow-md text-center flex flex-col items-center transition-transform duration-200 hover:scale-105">
        <FontAwesomeIcon icon={faEdit} className="text-3xl mb-2 text-gray-700" />
        <span className="text-xl font-bold text-gray-700">Search</span>
        </button>

    );
};

export default SearchButton;