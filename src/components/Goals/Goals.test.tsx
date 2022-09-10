import Goals from "./Goals";
import { render, screen } from "@testing-library/react";

describe("Goals", () => {
  const goalsMock = [
    { id: "123", goal: "Some goal", month: 2 },
    { id: "124", goal: "Some other goal", month: 3 },
  ];

  it("should show title", () => {
    render(<Goals goals={goalsMock} />);

    expect(screen.getByText("Goals")).toBeInTheDocument();
  });

  it("should show months", () => {
    render(<Goals goals={goalsMock} />);

    expect(screen.getAllByTestId("goal")).toHaveLength(12);
  });

  it("should show goals", () => {
    render(<Goals goals={goalsMock} />);

    expect(screen.getByText("Some goal")).toBeInTheDocument();
    expect(screen.getByText("Some other goal")).toBeInTheDocument();
  });
});
