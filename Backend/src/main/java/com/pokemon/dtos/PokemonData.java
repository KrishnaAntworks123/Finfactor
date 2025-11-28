package com.pokemon.dtos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PokemonData {

    private int id;
    private String name;
    private int height;
    private int weight;

    private List<TypeItem> types;
    private Sprites sprites;
    private List<StatItem> stats;
    private List<MoveItem> moves;

    // ---------- Inner DTOs ----------
    @Data
    public static class TypeItem {
        private int slot;
        private Type type;
    }

    @Data
    public static class Type {
        private String name;
        private String url;
    }

    @Data
    public static class Sprites {
        private String frontDefault;
        private OtherSprites other;

        @Data
        public static class OtherSprites {
            private OfficialArtwork officialArtwork;

            @Data
            public static class OfficialArtwork {
                private String front_default;
            }
        }
    }

    @Data
    public static class StatItem {
        private int base_stat;
        private Stat stat;

        @Data
        public static class Stat {
            private String name;
        }
    }

    @Data
    public static class MoveItem {
        private Move move;

        @Data
        public static class Move {
            private String name;
            private String url;
        }
    }
}
