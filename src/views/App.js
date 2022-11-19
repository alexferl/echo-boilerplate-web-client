import m from "mithril";

export const App = (state, actions) => {
  return {
    view: () => {
      console.log("APP", state.user);
      return m("main", [m("h1", "home")]);
    },
  };
};
