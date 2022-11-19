import m from "mithril";

export const User = (state) => {
  return {
    view: () =>
      state.user.current
        ? m("main", [
            m("h1", "Profile"),
            m("p", state.user.current.username),
            m("p", state.user.current.email),
            m("p", state.user.current.name),
            m("p", state.user.current.bio),
            m("p", state.user.current.created_at),
          ])
        : m("h1", "Loading"),
  };
};
