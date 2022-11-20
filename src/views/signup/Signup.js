import m from "mithril";

export const Signup = () => {
  let email;
  let password;
  return {
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
              email = e.target.value;
            },
          }),
          m("label", "password"),
          m("input", {
            type: "password",
            placeholder: "password",
            oninput: (e) => {
              password = e.target.value;
            },
          }),
          m("button", { type: "submit" }, "Create"),
        ],
      );
    },
  };
};
