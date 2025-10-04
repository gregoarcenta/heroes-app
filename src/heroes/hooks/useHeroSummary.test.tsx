import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary.tsx";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from "@/heroes/actions/get-summary.action.ts";

vi.mock("@/heroes/actions/get-summary.action", () => ({
  getSummaryAction: vi.fn().mockResolvedValue({
    totalHeroes: expect.any(Number),
    heroCount: expect.any(Number),
    villainCount: expect.any(Number),
    strongestHero: expect.any(Object),
    smartestHero: expect.any(Object),
  }),
}));
const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHeroSummary", () => {
  test("Should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
  test("Should return success state data when  API call succeeds", async () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test("Should return error when API call fails", async () => {
    const mockError = new Error("API call failed");
    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(mockGetSummaryAction).toHaveBeenCalled();

    expect(result.current.error?.message).toBe("API call failed");
  });
});
