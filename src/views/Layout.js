import m from "mithril";
import Cookies from "js-cookie";

const onSubmit = async (e, user) => {
  e.preventDefault();
  await user.logout();
  Cookies.remove("access_token");
  user.current = {};
  user.isLoggedIn = false;
  m.route.set("/");
};

const isLoggedIn = (user) => {
  if (!user.isLoggedIn) {
    return m("div.navbar-end", [
      m(
        "ul.menu.menu-horizontal.p-0",
        m("li", m(m.route.Link, { href: "/login" }, "Log in")),
      ),
      m(m.route.Link, { class: "btn", href: "/signup" }, "Sign up"),
    ]);
  } else {
    return m(
      "div.flex-none.gap-2",
      m("div.dropdown.dropdown-end", [
        m(
          "label.btn.btn-ghost.btn-circle.avatar[tabindex=0]",
          m(
            "div.w-10.rounded-full",
            m("img[src=https://placeimg.com/80/80/people]"),
          ),
        ),
        m(
          "ul.mt-3.p-2.shadow.menu.menu-compact.dropdown-content.bg-base-100.rounded-box.w-52[tabindex=0]",
          [
            m(
              "li",
              m(
                m.route.Link,
                { class: "justify-between", href: "/profile" },
                "Profile",
              ),
            ),
            m(
              "form",
              {
                onsubmit: async (e) => {
                  await onSubmit(e, user);
                },
              },
              m("li", m("button[type=submit]", "Log out")),
            ),
          ],
        ),
      ]),
    );
  }
};

export const Layout = () => {
  let user;
  return {
    oninit: (vnode) => {
      user = vnode.attrs.state.user;
    },
    view: (vnode) =>
      m(
        "main.layout",
        [
          m("div.navbar.bg-base-100", [
            m(
              "div.flex-1",
              m(
                m.route.Link,
                { class: "btn btn-ghost normal-case text-xl", href: "/" },
                "logo",
              ),
            ),
            isLoggedIn(user),
          ]),
        ],
        m("div.container.mx-auto", vnode.children),
      ),
  };
};
