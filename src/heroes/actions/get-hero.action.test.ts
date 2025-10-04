import { describe, expect, test } from "vitest";
import { getHeroAction } from "@/heroes/actions/get-hero.action.ts";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const slug = "clark-kent";
    const hero = await getHeroAction(slug);

    expect(hero.image).toContain("http");
    expect(hero).toStrictEqual({
      id: expect.any(String),
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
      image: "http://localhost:3001/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
  });
  test("should throw an error if  hero is not found", async () => {
    const slug = "not-found";
    const hero = await getHeroAction(slug).catch((error) => {
      expect(error).toBeDefined();
    });
    expect(hero).toBeUndefined();
  });
});
