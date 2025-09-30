import { render, screen, fireEvent } from "@testing-library/react";
import GrandmasterModal from "../GrandmasterModal";

// ✅ Mock the named export useClock
jest.mock("../../utils/useClock", () => ({
  __esModule: true,
  useClock: () => "01:00:00",
}));

const player = {
  username: "testgm",
  name: "Test GM",
  countryName: "Norway",
  countryCode: "NO",
  fide: 2800,
  last_online: Math.floor(Date.now() / 1000) - 3600,
  joined: 1600000000,
  status: "basic",
  is_streamer: false,
  verified: true,
  league: "champions",
  streaming_platforms: [],
};

describe("GrandmasterModal snapshots", () => {
  beforeAll(() => {
    jest.spyOn(Date.prototype, "toLocaleString").mockReturnValue("9/30/2025, 8:53:00 PM");
  });

  afterAll(() => {
    (Date.prototype.toLocaleString as jest.Mock).mockRestore();
  });

  it("matches snapshot with player info", () => {
    const { asFragment } = render(
      <GrandmasterModal player={player} onClose={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders player details", () => {
    render(<GrandmasterModal player={player} onClose={() => {}} />);

    expect(screen.getByText(/Test GM/i)).toBeInTheDocument();
    expect(screen.getByText(/\(testgm\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Norway/)).toBeInTheDocument();
    expect(screen.getByText(/Rating: 2800/i)).toBeInTheDocument();
    expect(screen.getByText(/01:00:00/i)).toBeInTheDocument(); // ✅ mocked clock
    expect(screen.getByText(/9\/30\/2025, 8:53:00 PM/i)).toBeInTheDocument(); // ✅ stable date
  });

  it("closes when clicking the close button", () => {
    const onClose = jest.fn();
    render(<GrandmasterModal player={player} onClose={onClose} />);
    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalled();
  });
});
