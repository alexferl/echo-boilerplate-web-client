import m from "mithril";

export const timer = (function () {
  let timeout = 0;
  return function (e, callback, ms) {
    e.redraw = false;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
      m.redraw();
    }, ms);
  };
})();
