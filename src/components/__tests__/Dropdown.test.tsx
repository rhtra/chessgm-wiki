import { render } from "@testing-library/react";
import Dropdown from "../Dropdown";

const options = [
  { value: "username", label: "Username" },
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
];

describe("Dropdown snapshots", () => {
  it("matches snapshot (default)", () => {
    const { asFragment } = render(
      <Dropdown label="Sort by" value="username" options={options} onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with order toggle", () => {
    const { asFragment } = render(
      <Dropdown
        label="Sort by"
        value="firstName"
        options={options}
        onChange={() => {}}
        order="asc"
        onOrderChange={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
