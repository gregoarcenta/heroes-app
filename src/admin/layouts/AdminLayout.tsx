import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="bg-emerald-800 h-screen flex flex-col items-center justify-center text-white">
      <Outlet />
    </div>
  );
};
