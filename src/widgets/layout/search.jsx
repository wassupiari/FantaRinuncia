import React, { useState } from 'react';
import { CommandLineIcon } from "@heroicons/react/24/outline";

function Search({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') { // Verifica se la query non è vuota
            onSearch(searchQuery); // Passa la query di ricerca al componente padre
        }
        // Pulisce il campo di ricerca dopo l'invio, indipendentemente dalla query
        setSearchQuery('');
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="flex items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca per nome..."
                    className="w-full rounded-l-lg border-none py-2 px-4 outline-none"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg flex items-center justify-center">
                    <CommandLineIcon className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
}

export default Search;
