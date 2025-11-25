package com.pokemon.controllers;

import com.pokemon.dtos.SinglePokemonDto;
import com.pokemon.dtos.SinglePokemonResponse;
import com.pokemon.service.PokemonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin(origins = "*")
public class controller {
    public final PokemonService pokemonService;

    public controller(PokemonService pokemonService) {
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
            SinglePokemonResponse response = pokemonService.GetSinglePokemon(name);
            SinglePokemonDto responseToSend= SinglePokemonDto.builder().singlePokemonResponse(response).success(true).message("success").build();
            if (response == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(responseToSend);
        }
        catch (Exception e) {
            SinglePokemonDto responseToSend= SinglePokemonDto.builder().success(true).message("failed").build();
            return new ResponseEntity<>(responseToSend,HttpStatus.BAD_REQUEST);
        }
    }
}
