import React from "react";

export const SearchPage = React.lazy(
  () => import("@/heroes/pages/search/SearchPage")
);

export const HeroPage = React.lazy(
  () => import("@/heroes/pages/hero/HeroPage")
);
