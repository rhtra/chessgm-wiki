import { render } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar snapshots", () => {
  it("matches snapshot when empty", () => {
    const { asFragment } = render(<SearchBar value="" onChange={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with value", () => {
    const { asFragment } = render(
      <SearchBar value="magnus" onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
