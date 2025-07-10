import axios from "axios";

const API = "/api/practice";

export const fetchProblems = () => axios.get(API);
export const addProblem = (data: any) => axios.post(API, data);
export const updateProblemStatus = (id: string, status: string) =>
  axios.put(`${API}/${id}`, { status });
