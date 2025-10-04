import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero.tsx";
import { getHeroesByPageAction } from "@/heroes/actions/get-heros-by-page.action.ts";

vi.mock("@/heroes/actions/get-heros-by-page.action");
const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginatedHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("Should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6, "all"), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
  test("should return success state with data whe API call succeds", async () => {
    const mockHeroesData = { total: 25, pages: 25, heroes: [] };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginatedHero(1, 6, "all"), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
  });
});
