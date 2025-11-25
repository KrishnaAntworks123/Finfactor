import { useEffect, useState } from 'react';
import { FetchSinglePokemon } from '../Api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { PokemonData } from '../types';


const typeColors: Record<string, string> = {
    normal: 'from-gray-400 to-gray-600',
    fire: 'from-orange-400 to-red-600',
    water: 'from-blue-400 to-blue-600',
    electric: 'from-yellow-300 to-yellow-500',
    grass: 'from-green-400 to-green-600',
    ice: 'from-cyan-300 to-cyan-500',
    fighting: 'from-red-700 to-red-900',
    poison: 'from-purple-400 to-purple-600',
    ground: 'from-yellow-600 to-yellow-800',
    flying: 'from-indigo-300 to-indigo-500',
    psychic: 'from-pink-400 to-pink-600',
    bug: 'from-lime-400 to-lime-600',
    rock: 'from-stone-500 to-stone-700',
    ghost: 'from-purple-700 to-purple-900',
    dragon: 'from-indigo-500 to-indigo-800',
    steel: 'from-slate-400 to-slate-600',
    fairy: 'from-pink-300 to-pink-500',
};

const PokemonCard = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const name = searchParams.get('name');

    const [data, setData] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    async function fetchData() {
        if (!name) {
            setError(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(false);

        try {
            const response = await FetchSinglePokemon(name);
            if (response.success === true) {
                setData(response.singlePokemonResponse);
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [name]);

    const mainType = data?.types[0]?.type.name || 'normal';
    const bgGradient = typeColors[mainType] || typeColors.normal;

    const imageUrl =
        data?.sprites?.other?.['official-artwork']?.front_default ||
        data?.sprites?.frontDefault ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-32 w-32 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-200 transition-all duration-700">
                <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Pokemon Not Found</h2>
                    <p className="text-gray-500 mb-8">
                        We couldn't find a Pokemon named <span className="font-bold text-gray-700">"{name}"</span>.
                        Please check the spelling and try again.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-800 hover:bg-black text-white font-medium rounded-lg transition-colors w-full"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen w-full bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4 md:p-8 transition-colors duration-700`}>

            {data && (
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                    <div className={`md:w-1/2 relative flex flex-col items-center justify-center p-10 bg-gradient-to-b ${bgGradient} md:bg-none`}>

                        <div className="absolute w-64 h-64 bg-white opacity-20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 text-center">
                            <span className="text-white/80 text-9xl font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 select-none">
                                #{String(data.id).padStart(3, '0')}
                            </span>

                            <img
                                src={imageUrl}
                                alt={data.name}
                                className="w-64 h-64 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 relative z-20"
                            />

                            <h1 className="text-4xl md:text-5xl font-black text-white mt-4 capitalize drop-shadow-md">
                                {data.name}
                            </h1>

                            <div className="flex gap-2 justify-center mt-4">
                                {data.types.map((t) => (
                                    <span
                                        key={t.type.name}
                                        className="px-4 py-1.5 text-sm font-bold text-gray-800 bg-white/90 rounded-full shadow-sm uppercase tracking-wider"
                                    >
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                        <div className="mb-8">
                            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">
                                Physical Stats
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">Height</p>
                                    <p className="text-2xl font-bold text-gray-800">{(data.height / 10).toFixed(1)} <span className="text-base font-medium text-gray-400">m</span></p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">Weight</p>
                                    <p className="text-2xl font-bold text-gray-800">{(data.weight / 10).toFixed(1)} <span className="text-base font-medium text-gray-400">kg</span></p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">
                                About
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                This is a {data.types.map(t => t.type.name).join(' and ')} type Pokemon.
                                It is indexed as #{data.id} in the National Pokedex.
                            </p>
                        </div>

                        <div className="mt-auto pt-8">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-400 hover:text-gray-800 font-semibold text-sm transition-colors flex items-center gap-2"
                            >
                                ← Back to Search
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonCard;