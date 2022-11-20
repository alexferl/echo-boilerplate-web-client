import m from "mithril";
import { App } from "./views/App";
import { Layout } from "./views/Layout";
import { Login } from "./views/login/Login";
import { Signup } from "./views/signup/Signup";
import { User } from "./views/user/User";
import { state, actions } from "./store";
import "./app.css";

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
    render: () => {
      return m(Layout, { state, actions }, m(App, { state, actions }));
    },
  },
  "/login": {
    onmatch: redirectHome(Login),
    render: () => {
      return m(Login, { state, actions });
    },
  },
  "/signup": {
    onmatch: redirectHome(Signup),
    render: () => {
      return m(Signup);
    },
  },
  "/profile": {
    onmatch: redirectLogin,
    render: () => {
      return m(Layout, { state, actions }, m(User, { state, actions }));
    },
  },
});
