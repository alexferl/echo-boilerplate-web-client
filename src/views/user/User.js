import m from "mithril";

export const User = () => ({
  view: ({ attrs }) => {
    let user = attrs.actions.getCurrentUser();
    return user
      ? m("main", [
          m("h1", "Profile"),
          m("p", user.username),
          m("p", user.email),
          m("p", user.name),
          m("p", user.bio),
          m("p", user.created_at),
        ])
      : m("h1", "Loading");
  },
});
