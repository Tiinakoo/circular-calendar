import axios, { AxiosResponse } from "axios";

const baseUrl = "http://localhost:3001/goals";

const getGoals = async () =>
  await axios.get(baseUrl).then((res: AxiosResponse) => res);

export default getGoals;
