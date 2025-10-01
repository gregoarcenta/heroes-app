import { useSearchParams } from "react-router";
import { getSearchFilters } from "@/lib/utils.ts";
import type { SearchOptions } from "@/heroes/interfaces/searchOptions.interface.ts";

export const useSearchPageQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = getSearchFilters(searchParams);
  const isAdvancedFilters = !!searchParams.get("advanced-filters");

  const handleFilterChange = <K extends keyof SearchOptions>(
    filter: K,
    value: SearchOptions[K],
  ) => {
    setSearchParams((searchParams) => {
      switch (filter) {
        case "name":
          if (!value) {
            searchParams.delete(filter);
            break;
          }
          searchParams.set(filter, value);
          break;
        case "strength":
          searchParams.set(filter, value ?? "1");
          break;
        case "team":
          searchParams.set(filter, value ?? "");
          break;
        case "category":
          searchParams.set(filter, value ?? "");
          break;
        case "status":
          searchParams.set(filter, value ?? "");
          break;
        case "universe":
          searchParams.set(filter, value ?? "");
          break;
      }
      return searchParams;
    });
  };

  const toggleAdvancedFilters = () => {
    setSearchParams((searchParams) => {
      if (searchParams.has("advanced-filters")) {
        searchParams.delete("advanced-filters");
      } else {
        searchParams.set("advanced-filters", "true");
      }
      return searchParams;
    });
  };

  const clearFilters = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("name");
      searchParams.delete("strength");
      searchParams.delete("team");
      searchParams.delete("category");
      searchParams.delete("status");
      searchParams.delete("universe");
      return searchParams;
    });
  };

  return {
    //state
    filters,
    isAdvancedFilters,
    //methods
    toggleAdvancedFilters,
    handleFilterChange,
    clearFilters,
  };
};
