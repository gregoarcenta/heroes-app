import { type PropsWithChildren, useEffect, useState } from "react";
import type { Hero } from "@/heroes/interfaces/hero.interface.ts";
import { FavoriteHeroContext } from "@/heroes/context/heroContext.ts";
import * as z from "zod";

const heroSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  alias: z.string(),
  powers: z.array(z.string()),
  description: z.string(),
  strength: z.number(),
  intelligence: z.number(),
  speed: z.number(),
  durability: z.number(),
  team: z.string(),
  image: z.string(),
  firstAppearance: z.string(),
  status: z.string(),
  category: z.string(),
  universe: z.string(),
});

const favoritesSchema = z.array(heroSchema);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  if (!favorites) return [];

  const parsed = JSON.parse(favorites);
  const result = favoritesSchema.safeParse(parsed);

  if (result.success) return result.data;

  return [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (hero: Hero) => {
    const isHero = favorites.some((favHero) => favHero.id === hero.id);

    if (isHero) {
      setFavorites(favorites.filter((favHero) => favHero.id !== hero.id));
    } else {
      setFavorites([...favorites, hero]);
    }
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some((favHero) => favHero.id === hero.id);
  };

  return (
    <FavoriteHeroContext
      value={{
        //state
        favorites,
        favoriteCount: favorites.length,
        //methods
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
