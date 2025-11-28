import { useEffect, useState } from 'react';
import { FetchSinglePokemon } from '../Api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { PokemonData } from '../types';

const typeColors: Record<string, string> = {
    normal: 'bg-gray-600',
    fire: 'bg-orange-400',
    water: 'bg-blue-400',
    electric: 'bg-yellow-300',
    grass: 'bg-green-400',
    ice: 'bg-cyan-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-400',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-400',
    bug: 'bg-lime-400',
    rock: 'bg-stone-500',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-500',
    steel: 'bg-slate-400',
    fairy: 'bg-pink-400',
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
                setData(response.pokemonData);
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
    const bgGradient = typeColors[mainType] || typeColors['normal'];

    const imageUrl =
        data?.sprites?.other?.['official-artwork']?.front_default ||
        data?.sprites?.front_default ||
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
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-200">
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
        <div className={`min-h-screen w-full ${bgGradient} flex items-center justify-center p-4 md:p-8 transition-colors duration-700`}>

            {data && (
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-100 mb-3 drop-shadow-2xl hover:text-gray-900 text-xl md:text-2xl font-semibold transition-colors flex items-center gap-2"
                    >
                        ← Back to Search
                    </button>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:grid md:grid-cols-2 md:min-h-[500px]">

                        <div className={`relative flex flex-col items-center justify-center p-6 md:p-10 ${bgGradient} md:bg-transparent`}>
                            <div className='absolute top-6 left-6 text-white/90 text-2xl md:text-3xl drop-shadow-md font-extrabold'>
                                #{String(data.id).padStart(3, '0')}
                            </div>

                            <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-white opacity-20 rounded-full blur-3xl"></div>

                            <div className="relative z-10 text-center mt-8 md:mt-0">
                                <img
                                    src={imageUrl}
                                    alt={data.name}
                                    className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 relative z-20 mx-auto"
                                />

                                <h1 className="text-3xl md:text-5xl font-black text-white mt-4 capitalize drop-shadow-md">
                                    {data.name}
                                </h1>

                                <div className="flex gap-2 justify-center mt-4 flex-wrap">
                                    {data.types.map((t) => (
                                        <span
                                            key={t.type.name}
                                            className="px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-bold text-gray-800 bg-white/90 rounded-full shadow-sm uppercase tracking-wider"
                                        >
                                            {t.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center bg-white/90 md:bg-white/95 backdrop-blur-sm p-6 md:p-10">

                            <div className="mb-6">
                                <h3 className="text-gray-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4">
                                    Physical Stats
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 md:p-4 bg-gray-50 rounded-2xl border border-gray-200/50 shadow-sm">
                                        <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1">Height</p>
                                        <p className="text-xl md:text-2xl font-bold text-gray-800">{(data.height / 10).toFixed(1)} <span className="text-sm md:text-base font-medium text-gray-500">m</span></p>
                                    </div>
                                    <div className="p-3 md:p-4 bg-gray-50 rounded-2xl border border-gray-200/50 shadow-sm">
                                        <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1">Weight</p>
                                        <p className="text-xl md:text-2xl font-bold text-gray-800">{(data.weight / 10).toFixed(1)} <span className="text-sm md:text-base font-medium text-gray-500">kg</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-gray-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-3">
                                    Moves
                                </h3>
                                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                                    {data.moves && data.moves.length > 0 ? (
                                        data.moves.map((m, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg capitalize transition-colors cursor-default border border-gray-200"
                                            >
                                                {m.move.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">No moves available</span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6 md:mb-0">
                                <h3 className="text-gray-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-2">
                                    About
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base">
                                    This is a <span className="capitalize">{data.types.map(t => t.type.name).join(' and ')}</span> type Pokemon.
                                    It is indexed as <span className="font-bold">#{data.id}</span> in the National Pokedex.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonCard;