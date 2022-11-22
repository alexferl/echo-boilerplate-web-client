import m from "mithril";

export const timerRedraw = (() => {
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

export const timer = (() => {
  let timeout = 0;
  return (callback, ms) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, ms);
  };
})();
