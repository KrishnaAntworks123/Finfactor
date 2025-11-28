package com.pokemon.controllers;

import com.pokemon.dtos.PokemonData;
import com.pokemon.dtos.SinglePokemonDto;
import com.pokemon.service.PokemonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/pokemon")
@CrossOrigin(origins = "*")
public class PokemonController {
    public final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping("/test")
    public String test() {
        return "hello world";
    }

    @GetMapping("{name}")
    public ResponseEntity<SinglePokemonDto> getPokemonByName(@PathVariable String name) {
        System.out.println(name);
        try {
            PokemonData response = pokemonService.getSinglePokemon(name);
            SinglePokemonDto responseToSend= SinglePokemonDto.builder().pokemonData(response).success(true).message("success").build();
            if (response == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(responseToSend);
        }
        catch (Exception e) {
            SinglePokemonDto responseToSend= SinglePokemonDto.builder().success(true).message("failed").build();
            log.error("e: ", e);
            return new ResponseEntity<>(responseToSend,HttpStatus.BAD_REQUEST);
        }
    }
}
