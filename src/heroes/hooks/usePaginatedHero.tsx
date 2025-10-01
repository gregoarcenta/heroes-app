import { useQuery } from "@tanstack/react-query";
import type { HeroesResponse } from "@/heroes/interfaces/heroes.response.ts";
import { getHeroesByPageAction } from "@/heroes/actions/get-heros-by-page.action.ts";
import type { Category } from "@/heroes/hooks/useHomePageQueryParams.tsx";

export const usePaginatedHero = (
  page: number,
  limit: number,
  category: Category,
) => {
  return useQuery<HeroesResponse>({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPageAction(page, limit, category),
    staleTime: 1000 * 60 * 5,
  });
};
