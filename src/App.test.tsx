import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import getGoals from "./api/getGoals/getGoals";
import { act } from "react-dom/test-utils";

jest.mock("./api/getGoals/getGoals");

const getGoalsMock = getGoals as jest.Mock;

describe("App", () => {
  const goalsMock = {
    data: [
      { id: "123", goal: "Some goal", month: 2 },
      { id: "124", goal: "Some other goal", month: 3 },
    ],
  };

  it("renders header", async () => {
    const promise = getGoalsMock.mockImplementation(() =>
      Promise.resolve(goalsMock)
    );

    render(<App />);

    expect(screen.getByText("Goal organizer")).toBeInTheDocument();

    await act(async () => {
      await promise;
    });
  });

  it("should get data for goals", async () => {
    const promise = getGoalsMock.mockImplementation(() =>
      Promise.resolve(goalsMock)
    );
    render(<App />);

    expect(getGoalsMock).toHaveBeenCalled();

    await act(async () => {
      await promise;
    });
  });

  it("should show goals when there are goals", async () => {
    getGoalsMock.mockImplementation(() => Promise.resolve(goalsMock));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Goals")).toBeInTheDocument();
    });
  });

  it("should not show goals when there are no goals", async () => {
    getGoalsMock.mockImplementation(() =>
      Promise.resolve({
        data: [],
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Goals")).not.toBeInTheDocument();
    });
  });

  describe("when getting goals resolves with error", () => {
    it("should fail with an error", async () => {
      const promise = getGoalsMock.mockImplementation(() =>
        Promise.reject("Error")
      );

      render(<App />);

      await act(async () => {
        await promise;
      });

      await expect(getGoalsMock).rejects.toMatch("Error");
    });

    it("should show error message", async () => {
      const promise = getGoalsMock.mockImplementation(() =>
        Promise.reject("Error")
      );

      render(<App />);

      await act(async () => {
        await promise;
      });

      await expect(
        screen.getByText("Something went wrong when getting goals")
      ).toBeInTheDocument();
    });
  });
});
