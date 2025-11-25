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
        <div className="relative h-screen flex flex-col items-center justify-center w-full py-24 bg-slate-950 overflow-hidden">

            <div className="absolute inset-0 z-0 h-full w-full bg-slate-950 ">

            </div>

            <div className="z-10 flex flex-col items-center w-full px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center tracking-tight">
                    Which Pokémon are you looking for?
                </h2>

                <form
                    onSubmit={handleSearch}
                    className="relative w-full max-w-md group"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>

                    <input
                        type="text"
                        className="block w-full pl-11 pr-12 py-4 bg-slate-900 border border-slate-800 rounded-full shadow-xl shadow-black/40 text-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all"
                        placeholder="e.g. Charizard"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="absolute inset-y-1.5 right-1.5 aspect-square flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all disabled:opacity-0 disabled:scale-75 disabled:cursor-default shadow-lg shadow-blue-900/20"
                        disabled={!searchTerm.trim()}
                        aria-label="Search"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PokemonSearchRedirect;