import m from "mithril";
import Cookies from "js-cookie";
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
        const resp = await API().req("POST", "/auth/login", body);
        console.log("LOGIN", resp);
        await UserModel().load();
        m.route.set("/");
      } catch (e) {
        console.error("CATCH", JSON.stringify(e, null, 2));
      }
    },
    load: async () => {
      try {
        const resp = await API().get("/user");
        console.log("LOAD", JSON.stringify(resp, null, 2));
        UserModel.current = resp;
        UserModel.isLoggedIn = true;
      } catch (e) {
        console.error("LOAD CATCH", JSON.stringify(e, null, 2));
      }
    },
    logout: async () => {
      await API().post("/auth/logout");

      UserModel.current = {};
      UserModel.isLoggedIn = false;

      Cookies.remove("access_token");

      m.route.set("/");
    },
  };
};
