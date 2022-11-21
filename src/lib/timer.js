import m from "mithril";

export const timer = (() => {
  let timeout = 0;
  return (e, callback, ms) => {
    e.redraw = false;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
      m.redraw();
    }, ms);
  };
})();
