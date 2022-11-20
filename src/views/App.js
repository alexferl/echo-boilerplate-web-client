import m from "mithril";

export const App = () => {
  console.log("APP");
  let user;
  return {
    oninit: (vnode) => {
      user = vnode.attrs.state.user;
    },
    view: () => {
      m(
        "div.hero.min-h-screen.bg-base-200",
        m(
          "div.hero-content.text-center",
          m("div.max-w-md", [
            m("h1.text-5xl.font-bold", "Hello there"),
            m(
              "p.py-6",
              "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
            ),
            m("button.btn.btn-primary", "Get Started"),
          ]),
        ),
      );
    },
  };
};
