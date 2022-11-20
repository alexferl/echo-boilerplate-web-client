import m from "mithril";

export const LogIn = () => {
  let email, password;
  return {
    view: (vnode) =>
      m(
        "div.flex.justify-center.items-center.h-screen",
        m(
          "div.card.flex-shrink-0.w-full.max-w-sm.shadow-2xl.bg-base-100",
          m("div.card-body", [
            m(
              "form",
              {
                onsubmit: async (e) => {
                  const user = vnode.attrs.state.user;
                  e.preventDefault();
                  await user.login("admin@example.com", "changeme");
                  user.current = await user.load();
                  user.isLoggedIn = true;
                  m.route.set("/");
                },
              },
              m("div.form-control", [
                m("label.label", m("span.label-text", "Email")),
                m("input.input.input-bordered[type=email]", {
                  oninput: (e) => {
                    email = e.target.value;
                  },
                }),
              ]),
              m("div.form-control", [
                m("label.label", m("span.label-text", "Password")),
                m("input.input.input-bordered[type=text]", {
                  oninput: (e) => {
                    password = e.target.value;
                  },
                }),
                m(
                  "label.label",
                  m(
                    "a.label-text-alt.link.link-hover",
                    { href: "#" },
                    "Forgot password?",
                  ),
                ),
              ]),
              m("div.form-control.mt-6", m("button.btn.btn-primary", "Log in")),
            ),
          ]),
        ),
      ),
  };
};
