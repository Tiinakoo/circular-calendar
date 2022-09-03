import addGoal from "./addGoal";
import axios from "axios";

jest.mock("axios");

const addGoalMock = axios.post as jest.Mock;

describe("addGoal", () => {
  const data = { goal: "foo", month: 1 };

  it("sends successfully data to an API", async () => {
    addGoalMock.mockImplementationOnce(() => Promise.resolve(data));

    await expect(addGoal(data)).resolves.toEqual(data);
  });

  it("shows error when API call fails", async () => {
    const errorMessage = "error happened";
    addGoalMock.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(addGoal(data)).rejects.toThrow(errorMessage);
  });
});
