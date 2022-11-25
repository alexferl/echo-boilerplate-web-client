import m from "mithril";

export const App = () => ({
  view: ({ attrs }) => {
    const actions = attrs.actions;
    let user = attrs.actions.getCurrentUser();
    return !actions.isLoggedIn()
      ? m(
          "div.hero.min-h-screen.bg-base-200",
          m(
            "div.hero-content.text-center",
            m("div.max-w-md", [m("h1.text-5xl.font-bold", "Hello there")]),
          ),
        )
      : m("h1", `Hi ${user.username}`);
  },
});
