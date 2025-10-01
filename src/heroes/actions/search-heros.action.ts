import { heroApi } from "@/heroes/api/hero.api.ts";
import type { Hero } from "@/heroes/interfaces/hero.interface.ts";
import type { SearchOptions } from "@/heroes/interfaces/searchOptions.interface.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (
  options: SearchOptions,
): Promise<Hero[]> => {
  const { name, category, strength, team, status, universe } = options;
  if (!name && !category && !strength && !team && !status && !universe) {
    return [];
  }

  const { data: heroes } = await heroApi.get<Hero[]>("/search", {
    params: { ...options },
  });

  return heroes.map((hero) => {
    return {
      ...hero,
      image: `${BASE_URL}/images/${hero.image}`,
    };
  });
};
