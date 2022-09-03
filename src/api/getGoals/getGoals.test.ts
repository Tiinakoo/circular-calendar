import axios from "axios";
import getGoals from "./getGoals";

jest.mock("axios");

const getGoalsMock = axios.get as jest.Mock;

describe("getGoals", () => {
  const data = { id: "123", goal: "foo", month: 1 };

  it("sends successfully data to an API", async () => {
    getGoalsMock.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getGoals()).resolves.toEqual(data);
  });

  it("shows error when API call fails", async () => {
    const errorMessage = "error happened";
    getGoalsMock.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getGoals).rejects.toThrow(errorMessage);
  });
});
