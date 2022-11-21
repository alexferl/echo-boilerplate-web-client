import { API } from "../lib/api";

export const UserModel = () => ({
  current: {},
  isLoggedIn: false,

  login: async (email, password) => {
    const body = {
      email,
      password,
    };

    return await API().req("POST", "/auth/login", body);
  },

  load: async () => await API().get("/user"),

  logout: async () => {
    await API().post("/auth/logout");
  },

  signup: async (email, password, username) => {
    const body = {
      email,
      password,
      username,
    };

    return API().req("POST", "/auth/signup", body);
  },
});
