import Goals from "./Goals";
import { render, screen, waitFor } from "@testing-library/react";

describe("Goals", () => {
  const goalsMock = [
    { id: "123", goal: "Some goal", month: 2 },
    { id: "124", goal: "Some other goal", month: 3 },
  ];

  it("should show title", async () => {
    render(<Goals goals={goalsMock} />);

    await waitFor(() => {
      expect(screen.getByText("Goals")).toBeInTheDocument();
    });
  });

  it("should show months", async () => {
    render(<Goals goals={goalsMock} />);

    await waitFor(() => {
      expect(screen.getByText("Feb")).toBeInTheDocument();
    });

    expect(screen.getByText("Mar")).toBeInTheDocument();
  });

  it("should show goals", async () => {
    render(<Goals goals={goalsMock} />);

    await waitFor(() => {
      expect(screen.getByText("Some goal")).toBeInTheDocument();
    });

    expect(screen.getByText("Some other goal")).toBeInTheDocument();
  });
});
