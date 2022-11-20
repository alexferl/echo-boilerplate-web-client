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

      try {
        await API().req("POST", "/auth/login", body);
      } catch (e) {
        console.error("LOGIN CATCH", JSON.stringify(e, null, 2));
      }
    },
    load: async () => {
      try {
        return await API().get("/user");
      } catch (e) {
        console.error("LOAD CATCH", JSON.stringify(e, null, 2));
      }
    },
    logout: async () => {
      await API().post("/auth/logout");
    },
  };
};
