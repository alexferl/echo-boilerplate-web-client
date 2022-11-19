import m from "mithril";

export const Login = (state, actions) => {
  console.log("LOGIN", state.user);
  return {
    email: "",
    password: "",
    view: () => {
      return m(
        "form",
        {
          onsubmit: (e) => {
            e.preventDefault();
            state.user.login("admin@example.com", "changeme");
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
