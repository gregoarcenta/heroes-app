import { Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="bg-primary h-screen flex flex-col items-center justify-center text-white">
      <Outlet />
    </div>
  );
};
