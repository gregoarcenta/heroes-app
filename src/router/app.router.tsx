import { createBrowserRouter, Navigate } from "react-router";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { AdminPage } from "@/admin/pages/AdminPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/hero/1",
    element: <HeroPage />
  },
  {
    path: "/search",
    element: <SearchPage />
  },
  {
    path: "admin",
    element: <AdminPage />
  },
  {
    path: "*",
    element: <Navigate to={"/"} />
  }
]);
