import { createBrowserRouter, Navigate } from "react-router";
import { Suspense, type JSX } from "react";

import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";

import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HomePage } from "@/heroes/pages/home/HomePage";

//Lazy loaded components
import { HeroPage, SearchPage } from "./lazy.router";

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Cargando...</div>}>{element}</Suspense>
);

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "hero/1",
        element: withSuspense(<HeroPage />)
      },
      {
        path: "search",
        element: withSuspense(<SearchPage />)
      }
    ]
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={"/"} />
  }
]);
