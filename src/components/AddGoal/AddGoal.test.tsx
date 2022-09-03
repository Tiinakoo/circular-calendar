import AddGoal from "./AddGoal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import addGoal from "../../api/addGoal/addGoal";
import { act } from "react-dom/test-utils";
import React from "react";

jest.mock("../../api/addGoal/addGoal");

const addGoalMock = addGoal as jest.Mock;

describe("AddGoal", () => {
  it("should show input for writing a goal", () => {
    render(<AddGoal />);

    expect(screen.getByText("Add goal *")).toBeInTheDocument();
  });

  it("should show dropdown for choosing a month for the goal", () => {
    render(<AddGoal />);

    expect(screen.getByText("Pick month *")).toBeInTheDocument();
  });

  it("should show submit button for sending a new goal", () => {
    render(<AddGoal />);

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should show submit button as disabled when fields are not valid", () => {
    render(<AddGoal />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should add new goal when fields are filled and form is submitted", async () => {
    render(<AddGoal />);

    addGoalMock.mockImplementationOnce(() => Promise.resolve());

    userEvent.type(screen.getByRole("textbox"), "New goal");
    userEvent.selectOptions(screen.getByRole("combobox"), ["1"]);
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(addGoalMock).toHaveBeenCalledWith({
        goal: "New goal",
        month: 1,
      });
    });
  });

  it("should show error message when submit resolves with error", async () => {
    const promise = addGoalMock.mockImplementationOnce(() =>
      Promise.reject("Error")
    );

    render(<AddGoal />);

    userEvent.type(screen.getByRole("textbox"), "New goal");
    userEvent.selectOptions(screen.getByRole("combobox"), ["1"]);
    fireEvent.submit(screen.getByRole("button"));

    await act(async () => {
      await promise;
    });

    await expect(
      screen.getByText("Oops, something went wrong, please try again!")
    ).toBeInTheDocument();
  });
});
