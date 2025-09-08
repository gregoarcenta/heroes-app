import { Button } from "./components/ui/button";

export const App = () => {
  return (
    <div className="bg-primary h-screen flex flex-col items-center justify-center">
      <h1 className="text-white">Hola Mundo</h1>
      <Button>Click me</Button>
    </div>
  );
};
