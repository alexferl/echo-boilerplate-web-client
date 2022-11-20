import m from "mithril";
import Cookies from "js-cookie";
import { UserModel } from "./models/UserModel";

const State = () => ({ user: UserModel() });
const Actions = (state) => ({
  login: async (email, password) => {
    try {
      await state.user.login(email, password);
      state.user.current = await state.user.load();
      state.user.isLoggedIn = true;
      m.route.set("/");
    } catch (e) {
      console.error("ACTIONS LOGIN", JSON.stringify(e, null, 2));
    }
  },
  logout: async () => {
    await state.user.logout();
    Cookies.remove("access_token");
    state.user.current = {};
    state.isLoggedIn = false;
    m.route.set("/");
  },
});

export const state = State();
export const actions = Actions(state);
