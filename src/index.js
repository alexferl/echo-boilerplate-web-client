import m from "mithril";
import { App } from "./views/App";
import { Layout } from "./views/Layout";
import { LogIn } from "./views/login/LogIn";
import { SignUp } from "./views/signup/SignUp";
import { User } from "./views/user/User";
import { UserModel } from "./models/UserModel";
import "./app.css";

const State = () => ({ user: UserModel() });
const state = State();

const redirectLogin = () => {
  if (!state.user.isLoggedIn) m.route.set("/login");
  else return App;
};

const redirectHome = (component) => {
  if (state.user.isLoggedIn) m.route.set("/");
  else return component;
};

m.route.prefix = "";
m.route(document.body, "/", {
  "/": {
    render: () => m(Layout, { state }, m(App, { state })),
  },
  "/login": {
    onmatch: redirectHome(LogIn),
    render: () => m(LogIn, { state }),
  },
  "/signup": {
    onmatch: redirectHome(SignUp),
    render: () => m(SignUp, { state }),
  },
  "/profile": {
    onmatch: redirectLogin,
    render: () => m(Layout, { state }, m(User, { state })),
  },
});
