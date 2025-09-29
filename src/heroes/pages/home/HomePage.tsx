import { use } from "react";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotron";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs.tsx";

import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary.tsx";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero.tsx";
import { useHomeQueryParams } from "@/heroes/hooks/useHomeQueryParams.tsx";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext.tsx";

const HomePage = () => {
  const { favorites, favoriteCount } = use(FavoriteHeroContext);

  const { page, limit, activeTab, category, setActiveTab } =
    useHomeQueryParams();

  const { data: summary } = useHeroSummary();
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

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
            All Characters ({summary?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-4 w-4" />
            Favorites ({favoriteCount})
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab("villains")}
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
        <TabsContent value="favorites">
          <HeroGrid heroes={favorites} />
        </TabsContent>
        <TabsContent value="heroes">
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
        <TabsContent value="villains">
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {activeTab !== "favorites" && (
        <CustomPagination
          totalPages={heroesResponse?.pages || 1}
          currentPage={+page}
        />
      )}
    </>
  );
};

export default HomePage;
