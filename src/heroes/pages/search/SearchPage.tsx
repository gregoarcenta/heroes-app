import { CustomJumbotrom } from "@/components/custom/CustomJumbotron";
import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotrom
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      {/* stats dashoboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
