import m from "mithril";

export const Signup = () => {
  return {
    email: "",
    password: "",
    view: () => {
      return m(
        "form",
        {
          onsubmit: (e) => {
            e.preventDefault();
          },
        },
        [
          m("label", "email"),
          m("input", {
            type: "email",
            placeholder: "email",
            oninput: (e) => {
              Signup.email = e.target.value;
            },
          }),
          m("label", "password"),
          m("input", {
            type: "password",
            placeholder: "password",
            oninput: (e) => {
              Signup.password = e.target.value;
            },
          }),
          m("button", { type: "submit" }, "Create"),
        ],
      );
    },
  };
};
