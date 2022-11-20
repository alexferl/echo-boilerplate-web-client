import m from "mithril";

let Input = {
  name: "",
  type: "",
  error: "",
  value: "",
  validate: () => {
    Input.error = !Input.value
      ? `Please enter ${Input.name.toLowerCase()}`
      : "";
  },
  isValid: () => {
    return !Input.error;
  },
  view: (vnode) => {
    console.log("VNODE", vnode.attrs);
    Input.name = vnode.attrs.name;
    Input.type = vnode.attrs.type;
    return [
      m("div.form-control", [
        m("label.label", m("span.label-text", Input.name)),
        m("input", {
          className: Input.error
            ? "input input-bordered input-error"
            : "input input input-bordered",
          value: Input.value,
          type: Input.type,
          oninput: (e) => {
            Input.value = e.target.value;
            Input.error && Input.validate();
          },
        }),
      ]),
      Input.error &&
        m(
          "label.label",
          m("span.label-text[style=color:hsl(var(--er))]", Input.error),
        ),
    ];
  },
};

let Input2 = {
  name: "",
  type: "",
  error: "",
  value: "",
  validate: () => {
    Input2.error = !Input2.value
      ? `Please enter ${Input2.name.toLowerCase()}`
      : "";
  },
  isValid: () => {
    return !Input2.error;
  },
  view: (vnode) => {
    console.log("VNODE", vnode.attrs);
    Input2.name = vnode.attrs.name;
    Input2.type = vnode.attrs.type;
    return [
      m("div.form-control", [
        m("label.label", m("span.label-text", Input2.name)),
        m("input", {
          className: Input2.error
            ? "input input-bordered input-error"
            : "input input input-bordered",
          value: Input2.value,
          type: Input2.type,
          oninput: (e) => {
            Input2.value = e.target.value;
            Input2.error && Input2.validate();
          },
        }),
      ]),
      Input2.error &&
        m(
          "label.label",
          m("span.label-text[style=color:hsl(var(--er))]", Input2.error),
        ),
    ];
  },
};

export const SignUp = () => {
  let email, password, username;
  const passwordInput = Input;
  const usernameInput = Input;
  return {
    isValid: () => {
      passwordInput.validate();
      usernameInput.validate();
      return !!(passwordInput.isValid() && usernameInput.isValid());
    },
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
                  try {
                    await user.signup(email, password, username);
                  } catch (e) {
                    console.log("E", JSON.stringify(e, null, 2));
                    return;
                  }
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
              m(passwordInput, { name: "Password", type: "password" }),
              m(usernameInput, { name: "Username", type: "text" }),
              m(
                "div.form-control.mt-6",
                m(
                  "button.btn.btn-primary",
                  {
                    onclick() {
                      if (SignUp().isValid()) {
                        m.route.set("/dashboard");
                      }
                    },
                  },
                  "Create",
                ),
              ),
            ),
          ]),
        ),
      ),
  };
};
