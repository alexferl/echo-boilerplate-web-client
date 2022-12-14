import m from "mithril";
import { powerform } from "powerform";
import { required, minLength, maxLength, isEmail } from "validatex";
import { timerRedraw, timer } from "../../lib/timer";

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

let emailError;
let usernameError;

const onSubmit = async (e, actions) => {
  e.preventDefault();
  if (!form.validate()) {
    return;
  }

  try {
    await actions.signup(
      form.email.getData(),
      form.password.getData(),
      form.username.getData(),
    );
  } catch (e) {
    if (e.code === 409) {
      emailError = "Email is already taken.";
    }
    return;
  }

  m.route.set("/");
};

const checkUser = async (user) => {
  if (form.username.isValid()) {
    try {
      const resp = await user.checkUserExist(form.username.getData());
      if (resp !== undefined) {
        usernameError = "Username is already taken.";
      }
    } catch (e) {
      if (e.code === 404) {
        usernameError = null;
      }
    }
  }
};

export const SignUp = () => ({
  oninit: () => {
    form.reset();
  },

  view: ({ attrs }) =>
    m(
      "div.flex.justify-center.items-center.h-screen",
      m(
        "div.card.flex-shrink-0.w-full.max-w-sm.shadow-2xl.bg-base-100",
        m("div.card-body", [
          m(
            "form",
            {
              onsubmit: async (e) => await onSubmit(e, attrs.actions),
            },
            m("div.form-control", [
              m("label.label", m("span.label-text", "Email")),
              m("input", {
                class:
                  form.email.getError() || emailError
                    ? "input input-bordered input-error"
                    : form.email.isValid()
                    ? "input input input-bordered input-success"
                    : "input input-bordered",
                type: "email",
                oninput: ({ target }) => {
                  form.email.setData(target.value);
                  emailError = null;
                },
                onkeyup: (e) =>
                  timerRedraw(e, () => form.email.validate(), 500),
                onchange: () => form.email.validate(),
              }),
              m(
                "label.label",
                m(
                  "span.label-text[style=color:hsl(var(--er))]",
                  form.email.getError() || emailError,
                ),
              ),
            ]),
            m("div.form-control", [
              m("label.label", m("span.label-text", "Password")),
              m("input", {
                class: form.password.getError()
                  ? "input input-bordered input-error"
                  : form.password.isValid()
                  ? "input input input-bordered input-success"
                  : "input input-bordered",
                type: "password",
                oninput: ({ target }) => form.password.setData(target.value),
                onkeyup: (e) =>
                  timerRedraw(e, () => form.password.validate(), 500),
                onchange: () => form.password.validate(),
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
                class:
                  form.username.getError() || usernameError
                    ? "input input-bordered input-error"
                    : form.username.isValid()
                    ? "input input input-bordered input-success"
                    : "input input-bordered",
                type: "text",
                oninput: ({ target }) => form.username.setData(target.value),
                onkeyup: (e) => {
                  timerRedraw(e, () => form.username.validate(), 500);
                  timer(() => checkUser(attrs.state.user), 500);
                },
                onchange: () => form.username.validate(),
              }),
              m(
                "label.label",
                m(
                  "span.label-text[style=color:hsl(var(--er))]",
                  form.username.getError() || usernameError,
                ),
              ),
            ]),
            m(
              "div.form-control.mt-6",
              m(
                "button.btn.btn-primary",
                { disabled: !form.isValid() ? "disabled" : null },
                "Create",
              ),
            ),
          ),
        ]),
      ),
    ),
});
