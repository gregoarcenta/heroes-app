import { heroApi } from "@/heroes/api/hero.api.ts";
import type { Hero } from "@/heroes/interfaces/hero.interface.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (slug: string): Promise<Hero> => {
  const { data: hero } = await heroApi.get<Hero>(`/${slug}`);

  return {
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  };
};
