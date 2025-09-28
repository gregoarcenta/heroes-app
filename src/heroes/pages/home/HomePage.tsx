import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs.tsx";
import { getHeroesByPageAction } from "@/heroes/actions/get-heros-by-page.action.ts";
import type { HeroesResponse } from "@/heroes/interfaces/heroes.response.ts";
import { isValidNumber } from "@/lib/utils.ts";

const allowedTabs = ["all", "favorites", "heroes", "villains"] as const;
type Tab = (typeof allowedTabs)[number];

function isTab(value: unknown): value is Tab {
  return typeof value === "string" && allowedTabs.includes(value as Tab);
}

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get("tab");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const activeTab: Tab = isTab(tabParam) ? tabParam : "all";
  const page = isValidNumber(pageParam) ? pageParam : "1";
  const limit = isValidNumber(limitParam) ? limitParam : "6";

  const setActiveTab = (tab: Tab) => {
    setSearchParams({ tab, page, limit }, { replace: true });
  };

  const { data } = useQuery<HeroesResponse>({
    queryKey: ["heroes", { page, limit }],
    queryFn: () => getHeroesByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return (
    <>
      {/* Header */}
      <CustomJumbotrom
        title="Universo de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadCrumbs currentPage="Super héroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={activeTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Characters (16)
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-4 w-4" />
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
            Heroes (12)
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab("villains")}
          >
            Villains (2)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Character Grid */}
          <HeroGrid heroes={data?.heroes || []} />
        </TabsContent>
        <TabsContent value="favorites">
          {/* Mostrar todos los favoritos */}
          <h1>Heroes favoritos</h1>
          {/*<HeroGrid />*/}
        </TabsContent>
        <TabsContent value="heroes">
          {/* Mostrar todos los heroes */}
          <h1>Heroes</h1>
          {/*<HeroGrid />*/}
        </TabsContent>
        <TabsContent value="villains">
          {/* Mostrar todos los villanos */}
          <h1>Villanos</h1>
          {/*<HeroGrid />*/}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={data?.pages || 1} currentPage={+page} />
    </>
  );
};

export default HomePage;
