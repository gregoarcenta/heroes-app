import { useSearchParams } from "react-router";
import { isValidNumber } from "@/lib/utils.ts";

const allowedTabs = ["all", "favorites", "heroes", "villains"] as const;
const allowedCategories = ["all", "hero", "villain"] as const;

export type Tab = (typeof allowedTabs)[number];
export type Category = (typeof allowedCategories)[number];

function isTab(value: unknown): value is Tab {
  return typeof value === "string" && allowedTabs.includes(value as Tab);
}
function isCategory(value: unknown): value is Category {
  return (
    typeof value === "string" && allowedCategories.includes(value as Category)
  );
}

export const useHomePageQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get("tab");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const categoryParam = searchParams.get("category");

  const activeTab: Tab = isTab(tabParam) ? tabParam : "all";
  const page = isValidNumber(pageParam) ? pageParam : "1";
  const limit = isValidNumber(limitParam) ? limitParam : "6";
  const category = isCategory(categoryParam) ? categoryParam : "all";

  const setActiveTab = (tab: Tab) => {
    setSearchParams((searchParams) => {
      searchParams.set("tab", tab);

      switch (tab) {
        case "all":
          searchParams.set("category", "all");
          break;
        case "heroes":
          searchParams.set("category", "hero");
          searchParams.set("page", "1");
          break;
        case "villains":
          searchParams.set("category", "villain");
          searchParams.set("page", "1");
          break;
      }

      return searchParams;
    });
  };

  return {
    //properties
    activeTab,
    page,
    limit,
    category,
    //methods
    setActiveTab,
  };
};
