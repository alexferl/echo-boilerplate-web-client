import m from "mithril";
import { powerform } from "powerform";
import { required, minLength, maxLength, isEmail } from "validatex";
import { timer } from "../../lib/timer";

export function isValidUsername(val) {
  const m = `
  Username may only contain alphanumeric characters
  or single hyphens, underscores or dots and
  cannot begin or end with a hyphen, underscore or dot.
  `;
  return !/^[a-zA-Z0-9]+(?:[-._][a-zA-Z0-9]+)*$/.test(val) && m;
}

const schema = {
  email: [required(true), isEmail("Invalid email address.")],
  password: [required(true), minLength(12)],
  username: [required(true), isValidUsername, minLength(2), maxLength(30)],
};

const form = powerform(schema);

const submit = async (e, user) => {
  e.preventDefault();
  if (!form.validate()) {
    return;
  }

  try {
    await user.signup(
      form.email.getData(),
      form.password.getData(),
      form.username.getData(),
    );
    await user.login(form.email.getData(), form.password.getData());
  } catch (e) {
    console.log("E", JSON.stringify(e, null, 2));
    return;
  }

  user.current = await user.load();
  user.isLoggedIn = true;

  form.reset(); // reset form or else it stays valid

  m.route.set("/");
};

export const SignUp = () => {
  return {
    view: (vnode) => {
      return m(
        "div.flex.justify-center.items-center.h-screen",
        m(
          "div.card.flex-shrink-0.w-full.max-w-sm.shadow-2xl.bg-base-100",
          m("div.card-body", [
            m(
              "form",
              {
                onsubmit: async (e) => await submit(e, vnode.attrs.state.user),
              },
              m("div.form-control", [
                m("label.label", m("span.label-text", "Email")),
                m("input", {
                  className: form.email.getError()
                    ? "input input-bordered input-error"
                    : form.email.isValid()
                    ? "input input input-bordered input-success"
                    : "input input-bordered",
                  type: "email",
                  oninput: (e) => form.email.setData(e.target.value),
                  onkeyup: (e) => timer(e, () => form.email.validate(), 500),
                }),
                m(
                  "label.label",
                  m(
                    "span.label-text[style=color:hsl(var(--er))]",
                    form.email.getError(),
                  ),
                ),
              ]),
              m("div.form-control", [
                m("label.label", m("span.label-text", "Password")),
                m("input", {
                  className: form.password.getError()
                    ? "input input-bordered input-error"
                    : form.password.isValid()
                    ? "input input input-bordered input-success"
                    : "input input-bordered",
                  type: "password",
                  oninput: (e) => form.password.setData(e.target.value),
                  onkeyup: (e) => timer(e, () => form.password.validate(), 500),
                }),
                m(
                  "label.label",
                  m(
                    "span.label-text[style=color:hsl(var(--er))]",
                    form.password.getError(),
                  ),
                ),
              ]),
              m("div.form-control", [
                m("label.label", m("span.label-text", "Username")),
                m("input", {
                  className: form.username.getError()
                    ? "input input-bordered input-error"
                    : form.username.isValid()
                    ? "input input input-bordered input-success"
                    : "input input-bordered",
                  type: "text",
                  oninput: (e) => form.username.setData(e.target.value),
                  onkeyup: (e) => timer(e, () => form.username.validate(), 500),
                }),
                m(
                  "label.label",
                  m(
                    "span.label-text[style=color:hsl(var(--er))]",
                    form.username.getError(),
                  ),
                ),
              ]),
              m("div.form-control.mt-6", m("button.btn.btn-primary", "Create")),
            ),
          ]),
        ),
      );
    },
  };
};
