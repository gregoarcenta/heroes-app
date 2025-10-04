import { use } from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroProvider.tsx";
import { FavoriteHeroContext } from "@/heroes/context/heroContext.ts";
import type { Hero } from "@/heroes/interfaces/hero.interface.ts";

const mockHero: Hero = {
  id: "1",
  name: "Clark Kent",
  slug: "clark-kent",
  alias: "Superman",
  powers: [
    "Súper fuerza",
    "Vuelo",
    "Visión de calor",
    "Visión de rayos X",
    "Invulnerabilidad",
    "Súper velocidad",
  ],
  description:
    "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: "Liga de la Justicia",
  image: "1.jpeg",
  firstAppearance: "1938",
  status: "Active",
  category: "Hero",
  universe: "DC",
};

const TestComponent = () => {
  const { favorites, isFavorite, toggleFavorite, favoriteCount } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid={"favorite-count"}>{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>

      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );
};

describe("FavoriteHeroProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("Should initialize with default values", () => {
    renderContextTest();

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });
  test("should add hero to favorites when toggleFavorite is called with new Hero", () => {
    renderContextTest();
    const button = screen.getByTestId("toggle-favorite");

    fireEvent.click(button);

    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("Clark Kent");

    expect(localStorage.getItem("favorites")).toBe(
      `[${JSON.stringify(mockHero)}]`,
    );
  });
  test("should remove hero from favorites when toggleFavorite is called", () => {
    localStorage.setItem("favorites", JSON.stringify([mockHero]));

    renderContextTest();
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("Clark Kent");

    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("is-favorite").textContent).toBe("false");
    expect(screen.queryByTestId("hero-1")).toBeNull();
  });
});
