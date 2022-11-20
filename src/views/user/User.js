import m from "mithril";

export const User = () => {
  let user;
  return {
    oninit: (vnode) => {
      user = vnode.attrs.state.user;
    },
    view: () =>
      user.current
        ? m("main", [
            m("h1", "Profile"),
            m("p", user.current.username),
            m("p", user.current.email),
            m("p", user.current.name),
            m("p", user.current.bio),
            m("p", user.current.created_at),
          ])
        : m("h1", "Loading"),
  };
};
