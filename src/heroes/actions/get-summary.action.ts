import { heroApi } from "@/heroes/api/hero.api.ts";
import type { SummaryResponse } from "@/heroes/interfaces/summary.response.ts";

export const getSummaryAction = async (): Promise<SummaryResponse> => {
  const { data } = await heroApi.get<SummaryResponse>("/summary");
  return data;
};
