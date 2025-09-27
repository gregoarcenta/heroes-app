import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs.tsx";
import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "@/heroes/actions/get-heros-by-page.action.ts";
import type { HeroesResponse } from "@/heroes/interfaces/heroes.response.ts";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading } = useQuery<HeroesResponse>({
    queryKey: ["heroes"],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) {
    return <p>Cargando</p>;
  }

  return (
    <>
      {/* Header */}
      <CustomJumbotrom
        title="Universo de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadCrumbs
        currentPage="Super héroes"
        // breadcrumbs={[
        //   { label: "Home1", to: "/" },
        //   { label: "Home2", to: "/" },
        //   { label: "Home3", to: "/" },
        //   { label: "Home4", to: "/" }
        // ]}
      />

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
          <HeroGrid heroes={data!.heroes!} />
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
      <CustomPagination totalPages={2} />
    </>
  );
};

export default HomePage;
