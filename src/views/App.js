import m from "mithril";

export const App = () => {
  let user;
  return {
    oninit: (vnode) => {
      user = vnode.attrs.state.user;
    },
    view: () => {
      return m("main", [m("h1", "home")]);
    },
  };
};
