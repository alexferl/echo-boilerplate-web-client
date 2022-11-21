import m from "mithril";
import { powerform } from "powerform";
import { isEmail, required } from "validatex";
import { timer } from "../../lib/timer";

const schema = {
  email: [required(true), isEmail("Invalid email address.")],
  password: [required(true)],
};

const form = powerform(schema);

let error;

const submit = async (e, user) => {
  e.preventDefault();
  if (!form.validate()) {
    return;
  }

  try {
    await user.login(form.email.getData(), form.password.getData());
  } catch (e) {
    console.log("E", JSON.stringify(e, null, 2));
    if (e.code === 401) {
      error = "Incorrect email or password.";
    }
    return;
  }

  user.current = await user.load();
  user.isLoggedIn = true;

  m.route.set("/");
};

export const LogIn = () => ({
  oninit: () => {
    form.reset();
    error = null;
  },

  view: ({ attrs }) =>
    m(
      "div.flex.justify-center.items-center.h-screen",
      m("div.card.flex-shrink-0.w-full.max-w-sm.shadow-2xl.bg-base-100", [
        error
          ? m(
              "div.alert.alert-error.shadow-lg",
              m("div", [
                m(
                  "svg.stroke-current.flex-shrink-0.h-6.w-6[xmlns='http://www.w3.org/2000/svg'][fill='none'][viewBox='0 0 24 24']",
                  m(
                    "path[stroke-linecap='round'][stroke-linejoin='round'][stroke-width='2'][d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']",
                  ),
                ),
                m("span", error),
              ]),
            )
          : null,
        m("div.card-body", [
          m(
            "form",
            {
              onsubmit: async (e) => await submit(e, attrs.state.user),
            },
            m("div.form-control", [
              m("label.label", m("span.label-text", "Email")),
              m("input", {
                class: form.email.getError()
                  ? "input input-bordered input-error"
                  : "input input-bordered",
                oninput: ({ target }) => form.email.setData(target.value),
                onkeyup: (e) => timer(e, () => form.email.validate(), 500),
                onchange: () => form.email.validate(),
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
              m("input.input.input-bordered[type=password]", {
                class: form.password.getError()
                  ? "input input-bordered input-error"
                  : "input input-bordered",
                oninput: ({ target }) => form.password.setData(target.value),
                onkeyup: (e) => timer(e, () => form.password.validate(), 500),
              }),
              m(
                "label.label",
                m(
                  "span.label-text[style=color:hsl(var(--er))]",
                  form.password.getError(),
                ),
              ),
              m(
                "label.label",
                m(
                  "a.label-text-alt.link.link-hover",
                  { href: "#" },
                  "Forgot password?",
                ),
              ),
            ]),
            m(
              "div.form-control.mt-6",
              m(
                "button.btn.btn-primary",
                {
                  disabled: form.isValid() ? null : "disabled",
                },
                "Log in",
              ),
            ),
          ),
        ]),
      ]),
    ),
});
