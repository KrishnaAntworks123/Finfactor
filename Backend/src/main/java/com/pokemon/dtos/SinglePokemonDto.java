package com.pokemon.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SinglePokemonDto {
    private PokemonData pokemonData;
    private Boolean success;
    private String message;
}
