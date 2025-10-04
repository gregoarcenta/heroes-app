import { describe, expect, test } from "vitest";
import { getSummaryAction } from "@/heroes/actions/get-summary.action.ts";

describe("getSummaryAction", () => {
  test("should fetch summary and return complete information", async () => {
    const summary = await getSummaryAction();
    const expectedHero = expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
      alias: expect.any(String),
      powers: expect.any(Array),
      description: expect.any(String),
      strength: expect.any(Number),
      intelligence: expect.any(Number),
      speed: expect.any(Number),
      durability: expect.any(Number),
      team: expect.any(String),
      image: expect.any(String),
      firstAppearance: expect.any(String),
      status: expect.any(String),
      category: expect.any(String),
      universe: expect.any(String),
    });

    expect(summary).toStrictEqual({
      totalHeroes: expect.any(Number),
      strongestHero: expectedHero,
      smartestHero: expectedHero,
      heroCount: expect.any(Number),
      villainCount: expect.any(Number),
    });
  });
});
