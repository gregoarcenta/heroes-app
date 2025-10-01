import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotron";
import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid.tsx";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";
import { useSearchPageQueryParams } from "@/heroes/hooks/useSearchPageQueryParams";

export const SearchPage = React.memo(() => {
  const { filters, clearFilters } = useSearchPageQueryParams();

  const { data: heroesResponse = [] } = useQuery({
    queryKey: ["heroes", "search", filters],
    queryFn: () => searchHeroesAction(filters),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJumbotrom
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />
      <CustomBreadCrumbs currentPage="Buscador de héroes" />

      {/* stats dashoboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      {/*heroes grid*/}
      {heroesResponse.length > 0 ? (
        <HeroGrid heroes={heroesResponse} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No se encontraron resultados
          </h2>

          <p className="text-gray-500 max-w-md mb-6">
            Intenta ajustar los filtros o realizar una búsqueda {} para
            encontrar lo que buscas.
          </p>

          {(filters.name ||
            filters.universe ||
            filters.category ||
            filters.team ||
            filters.status ||
            filters.strength) && (
            <button
              className="cursor-pointer px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </>
  );
});

export default SearchPage;
