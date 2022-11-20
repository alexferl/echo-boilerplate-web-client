import m from "mithril";

const derp = (user) => {
  if (!user.isLoggedIn) {
    return [
      m("div", { class: "navbar-end" }, [
        m(
          "ul",
          { class: "menu menu-horizontal p-0" },
          m("li", m(m.route.Link, { href: "/login" }, "Log in")),
        ),
        m(m.route.Link, { class: "btn", href: "/signup" }, "Sign up"),
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
                  m.route.Link,
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

export const Layout = () => {
  let user;
  return {
    oninit: (vnode) => {
      user = vnode.attrs.state.user;
    },
    view: (vnode) => {
      return m(
        "main.layout",
        [
          m("div", { class: "navbar bg-base-100" }, [
            m(
              "div",
              { class: "flex-1" },
              m(
                m.route.Link,
                { class: "btn btn-ghost normal-case text-xl", href: "/" },
                "daisyUI",
              ),
            ),
            derp(user),
          ]),
        ],
        m("div", { class: "container mx-auto" }, vnode.children),
      );
    },
  };
};
