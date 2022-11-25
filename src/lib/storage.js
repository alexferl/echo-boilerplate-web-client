const readItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }

  return undefined;
};

const setItem = (key, value) => {
  try {
    return localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

const removeItem = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const localStore = (key) => ({
  get: () => readItem(key),
  set: (value) => setItem(key, value),
  delete: () => removeItem(key),
});
