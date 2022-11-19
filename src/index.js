import m from "mithril";
import "./app.css";
import { App } from "./views/App";
import { Layout } from "./views/Layout";
import { Login } from "./views/login/Login";
import { Signup } from "./views/signup/Signup";
import { UserModel } from "./models/UserModel";

const mountNode = document.querySelector("#app");

const State = () => ({ user: UserModel() });
const Actions = (state) => ({});

const state = State();
const actions = Actions(state);

m.route.prefix = "";
m.route(mountNode, "/", {
  "/": {
    render: () => {
      return m(Layout(state), m(App(state, actions)));
    },
  },
  "/login": Login(state, actions),
  "/signup": Signup,
  "/profile": {
    render: () => {
      return m(Layout(state), m(App(state, actions)));
    },
  },
});
