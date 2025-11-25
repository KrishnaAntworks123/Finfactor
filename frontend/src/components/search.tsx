import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

const PokemonSearchRedirect: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        navigate(`/pokemon?name=${searchTerm.trim().toLowerCase()}`);
    };

    return (
        <div className=" h-screen flex flex-col items-center justify-center w-full py-24 bg-slate-50">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">
                Which Pokémon are you looking for?
            </h2>

            <form
                onSubmit={handleSearch}
                className="relative w-full max-w-md group"
            >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>

                <input
                    type="text"
                    className="block w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-full shadow-sm text-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                    placeholder="e.g. Charizard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                    type="submit"
                    className="absolute inset-y-1 right-1 aspect-square flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-0 disabled:cursor-default"
                    disabled={!searchTerm.trim()}
                    aria-label="Search"
                >
                    <ArrowRight className="h-5 w-5" />
                </button>
            </form>

        </div>
    );
};

export default PokemonSearchRedirect;