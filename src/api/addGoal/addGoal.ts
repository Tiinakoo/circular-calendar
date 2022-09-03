import axios, { AxiosResponse } from "axios";
import { Goal } from "../../types";

const baseUrl = "http://localhost:3001/goals";

const addGoal = async (body: Omit<Goal, "id">) =>
  await axios.post(baseUrl, body).then((res: AxiosResponse) => res);

export default addGoal;
