import m from "mithril";

export const Login = () => {
  return {
    email: "",
    password: "",
    view: (vnode) => {
      return m(
        "form",
        {
          onsubmit: (e) => {
            e.preventDefault();
            vnode.attrs.actions.login("admin@example.com", "changeme");
          },
        },
        [
          m("label", "email"),
          m("input", {
            type: "email",
            placeholder: "email",
            oninput: (e) => {
              Login.email = e.target.value;
            },
          }),
          m("label", "password"),
          m("input", {
            type: "password",
            placeholder: "password",
            oninput: (e) => {
              Login.password = e.target.value;
            },
          }),
          m("button", { type: "submit" }, "Log in"),
        ],
      );
    },
  };
};
