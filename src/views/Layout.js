import m from "mithril";

const onSubmit = async (e, actions) => {
  e.preventDefault();
  await actions.logout();
  m.route.set("/");
};

const isLoggedIn = (actions) => {
  if (!actions.isLoggedIn()) {
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
                  await onSubmit(e, actions);
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

export const Layout = () => ({
  view: ({ attrs, children }) =>
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
          isLoggedIn(attrs.actions),
        ]),
      ],
      m("div.container.mx-auto", children),
    ),
});
