import m from "mithril";
import "./app.css";
import { App } from "./views/App";
import { Layout } from "./views/Layout";
import { LogIn } from "./views/login/LogIn";
import { SignUp } from "./views/signup/SignUp";
import { User } from "./views/user/User";
import { actions, state } from "./state";

const redirectLogin = () => {
  if (!actions.isLoggedIn()) m.route.set("/login");
  else return App;
};

const redirectHome = (component) => {
  if (actions.isLoggedIn()) m.route.set("/");
  else return component;
};

m.route.prefix = "";
m.route(document.body, "/", {
  "/": {
    render: () => m(Layout, { state, actions }, m(App, { state, actions })),
  },
  "/login": {
    onmatch: redirectHome,
    LogIn,
    render: () => m(LogIn, { state, actions }),
  },
  "/signup": {
    onmatch: redirectHome,
    SignUp,
    render: () => m(SignUp, { state, actions }),
  },
  "/profile": {
    onmatch: redirectLogin,
    render: () => m(Layout, { state, actions }, m(User, { state, actions })),
  },
});
