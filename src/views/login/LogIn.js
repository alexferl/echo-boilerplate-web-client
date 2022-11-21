import m from "mithril";
import { powerform } from "powerform";
import { isEmail, required } from "validatex";
import { timer } from "../../lib/timer";

const schema = {
  email: [required(true), isEmail("Invalid email address.")],
  password: [required(true)],
};

const form = powerform(schema);

const submit = async (e, user) => {
  e.preventDefault();
  if (!form.validate()) {
    return;
  }

  try {
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

export const LogIn = () => {
  return {
    view: (vnode) => {
      let user = vnode.attrs.state.user;
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
                m("input.input.input-bordered[type=email]", {
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
                m("input.input.input-bordered[type=text]", {
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
      );
    },
  };
};
