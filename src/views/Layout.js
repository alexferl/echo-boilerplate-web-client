import m from "mithril";

const derp = (user) => {
  if (!user.isLoggedIn) {
    return [
      m("div", { class: "navbar-end" }, [
        m(
          "ul",
          { class: "menu menu-horizontal p-0" },
          m("li", m("a", { href: "/login" }, "Log in")),
        ),
        m("a", { class: "btn", href: "/signup" }, "Sign up"),
      ]),
    ];
  } else {
    return [
      m(
        "div",
        { class: "flex-none gap-2" },
        m("div", { class: "dropdown dropdown-end" }, [
          m(
            "label",
            { class: "btn btn-ghost btn-circle avatar", tabindex: "0" },
            m(
              "div",
              { class: "w-10 rounded-full" },
              m("img", { src: "https://placeimg.com/80/80/people" }),
            ),
          ),
          m(
            "ul",
            {
              class:
                "mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52",
              tabindex: "0",
            },
            [
              m(
                "li",
                m(
                  "a",
                  { class: "justify-between", href: "/profile" },
                  " Profile ",
                ),
              ),
              m("li", m("a", "Logout")),
            ],
          ),
        ]),
      ),
    ];
  }
};

export const Layout = (state) => {
  return {
    view: (vnode) => {
      console.log("LAYOUT", state.user);
      return m(
        "main.layout",
        [
          m("div", { class: "navbar bg-base-100" }, [
            m(
              "div",
              { class: "flex-1" },
              m(
                "a",
                { class: "btn btn-ghost normal-case text-xl", href: "/" },
                "daisyUI",
              ),
            ),
            derp(state.user),
          ]),
        ],
        m("div", { class: "container mx-auto" }, vnode.children),
      );
    },
  };
};
