import { render } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination snapshots", () => {
  it("matches snapshot on first page", () => {
    const { asFragment } = render(
      <Pagination page={1} totalPages={3} onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot on middle page", () => {
    const { asFragment } = render(
      <Pagination page={2} totalPages={5} onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
