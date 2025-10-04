import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "@/heroes/actions/get-heros-by-page.action.ts";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "@/heroes/api/hero.api.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("getHeroesByPageAction", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test("Should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 10,
      heroes: [
        {
          image: "1.jpeg",
        },
        {
          image: "2.jpeg",
        },
      ],
    });
    const response = await getHeroesByPageAction(1);

    expect(response).toStrictEqual({
      total: 10,
      heroes: [
        { image: `${BASE_URL}/images/1.jpeg` },
        { image: `${BASE_URL}/images/2.jpeg` },
      ],
    });
  });
});
