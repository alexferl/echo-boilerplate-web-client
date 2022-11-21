import m from "mithril";

export const App = () => {
  return {
    view: (vnode) => {
      let user = vnode.attrs.state.user;
      return !user.isLoggedIn
        ? m(
            "div.hero.min-h-screen.bg-base-200",
            m(
              "div.hero-content.text-center",
              m("div.max-w-md", [m("h1.text-5xl.font-bold", "Hello there")]),
            ),
          )
        : m("h1", `Hi ${user.current.username}`);
    },
  };
};
