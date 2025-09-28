import type { Hero } from "@/heroes/interfaces/hero.interface.ts";

export interface SummaryResponse {
  totalHeroes: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
