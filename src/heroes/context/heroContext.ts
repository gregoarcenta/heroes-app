import { createContext } from "react";
import type { Hero } from "@/heroes/interfaces/hero.interface.ts";

interface FavoriteHeroContext {
  //state
  favorites: Hero[];
  favoriteCount: number;

  // methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);
