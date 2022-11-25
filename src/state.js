import Cookies from "js-cookie";
import { localStore } from "./lib/storage";
import { UserModel } from "./models/UserModel";

const persistedState = localStore("state");

const State = () => ({ user: UserModel() });
export const state = State();

const Actions = ({ user }) => ({
  login: async (email, password) => {
    await user.login(email, password);

    user.current = await user.getAuthenticated();
    user.isLoggedIn = true;

    persistedState.set(JSON.stringify(user));
  },

  logout: async () => {
    await user.logout();

    Cookies.remove("access_token");
    user.current = {};
    user.isLoggedIn = false;

    persistedState.delete();
  },

  signup: async (email, password, username) => {
    await user.signup(email, password, username);
    await actions.login(email, password);
  },

  isLoggedIn: () => {
    const s = JSON.parse(persistedState.get());
    if (s) {
      return s.isLoggedIn;
    }
  },

  getCurrentUser: () => {
    const s = JSON.parse(persistedState.get());
    if (s) {
      return s.current;
    }
  },
});
export const actions = Actions(state);
