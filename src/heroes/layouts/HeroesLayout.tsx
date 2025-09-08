import { Link, Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="bg-primary h-screen flex flex-col items-center justify-center text-white">
      <ul className="flex gap-4 mb-8">
        <li className="hover:underline">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="hover:underline">
          <Link to={"/hero/1"}>Hero</Link>
        </li>
        <li className="hover:underline">
          <Link to={"/search"}>Search</Link>
        </li>
        <li className="hover:underline">
          <Link to={"/admin"}>Admin</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
