import { heroApi } from "@/heroes/api/hero.api.ts";
import type { HeroesResponse } from "@/heroes/interfaces/heroes.response.ts";
import type { Category } from "@/heroes/hooks/useHomeQueryParams.tsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
  page: number,
  limit: number,
  category: Category,
): Promise<HeroesResponse> => {
  const { data } = await heroApi.get<HeroesResponse>("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
      category,
    },
  });

  return {
    ...data,
    heroes: data.heroes.map((hero) => {
      return {
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`,
      };
    }),
  };
};
