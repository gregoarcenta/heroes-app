import { createBrowserRouter, Navigate } from "react-router";

//Layouts
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";

//Pages
import AdminPage from "@/admin/pages/AdminPage";
import HomePage from "@/heroes/pages/home/HomePage";

//Lazy loaded pages
import { HeroPage, SearchPage } from "./lazy.router";

// const withSuspense = (element: JSX.Element) => (
//   <Suspense fallback={<div>Cargando...</div>}>{element}</Suspense>
// );

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hero/:slugId",
        // element: withSuspense(<HeroPage />)
        element: <HeroPage />,
      },
      {
        path: "search",
        // element: withSuspense(<SearchPage />)
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
