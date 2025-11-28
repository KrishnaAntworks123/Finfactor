export interface PokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;

    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites: {
        front_default: string | null;
        other?: {
            ["official-artwork"]?: {
                front_default: string | null;
            };
        };
    };

    stats?: {
        base_stat: number;
        stat: { name: string };
    }[];

    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
}
