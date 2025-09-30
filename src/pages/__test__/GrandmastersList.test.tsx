import { render, waitFor } from "@testing-library/react";
import GrandmastersList from "../GrandmastersList";

// ✅ Mock fetch so we don't hit Chess.com API
beforeAll(() => {
  (globalThis as any).fetch = jest.fn((url: string) => {
    if (url.includes("/titled/GM")) {
      return Promise.resolve({
        json: () => Promise.resolve({ players: ["magnuscarlsen", "hikaru"] }),
      });
    }
    if (url.includes("/player/magnuscarlsen")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "Magnus Carlsen",
            avatar: "https://example.com/magnus.jpg",
            country: "https://api.chess.com/pub/country/NO",
          }),
      });
    }
    if (url.includes("/player/hikaru")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "Hikaru Nakamura",
            avatar: "https://example.com/hikaru.jpg",
            country: "https://api.chess.com/pub/country/US",
          }),
      });
    }
    if (url.includes("/country/NO")) {
      return Promise.resolve({
        json: () => Promise.resolve({ name: "Norway", code: "NO" }),
      });
    }
    if (url.includes("/country/US")) {
      return Promise.resolve({
        json: () => Promise.resolve({ name: "United States", code: "US" }),
      });
    }
    if (url.includes("/stats")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({ fide: { last: { rating: 2800 } } }),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

describe("GrandmastersList snapshot", () => {
  it("matches snapshot after players load", async () => {
    const { asFragment } = render(<GrandmastersList />);
    await waitFor(() => {
      // wait for Magnus to render
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
