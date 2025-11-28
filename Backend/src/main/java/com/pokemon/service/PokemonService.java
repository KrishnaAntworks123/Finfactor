package com.pokemon.service;

import com.pokemon.dtos.PokemonData;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class PokemonService {
    private final WebClient webClient;

    public PokemonService(WebClient webClient) {
        this.webClient = webClient;
    }

    @Cacheable(value = "pokemon", key = "#name")
    public PokemonData getSinglePokemon(String name){
        return webClient.get()
                .uri("https://pokeapi.co/api/v2/pokemon/"+name)
                .retrieve()
                .bodyToMono(PokemonData.class)
                .block();
    }

}
