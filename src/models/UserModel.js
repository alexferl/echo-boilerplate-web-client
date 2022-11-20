import { API } from "../lib/api";

export const UserModel = () => {
  return {
    current: {},
    isLoggedIn: false,
    login: async (email, password) => {
      const body = {
        email: email,
        password: password,
      };

      return await API().req("POST", "/auth/login", body);
    },
    load: async () => {
      return await API().get("/user");
    },
    logout: async () => {
      await API().post("/auth/logout");
    },
    signup: async (email, password, username) => {
      const body = {
        email: email,
        password: password,
        username: username,
      };

      return API().req("POST", "/auth/signup", body);
    },
  };
};
