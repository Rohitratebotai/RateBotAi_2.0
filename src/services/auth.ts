import api from "./api";

export const adminLogin = async (username: string, password: string) => {
  return api.post("/auth/login", { username, password });
};
