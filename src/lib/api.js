import m from "mithril";

const base = "http://localhost:1323";

export const API = () => {
  return {
    opts: {},
    req: (method, path, data) => {
      const opts = {
        method: method,
        url: `${base}${path}`,
        headers: {},
        withCredentials: true,
      };

      if (data) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = data;
      }

      API.opts = opts;

      return m.request(opts);
    },
    do: async (req) => {
      try {
        return await req;
      } catch (e) {
        // TODO: check message to handle different 401s
        if (e.code === 401) {
          return API().refresh();
        }
        console.error("DO CATCH", JSON.stringify(e, null, 2));
      }
    },
    refresh: async () => {
      const { opts } = API;
      try {
        await API().req("POST", "/auth/refresh");
        return API().do(m.request(opts));
      } catch (e) {
        console.error("REFRESH CATCH", JSON.stringify(e, null, 2));
      }
    },
    get: (path) => {
      const req = API().req("GET", path);
      return API().do(req);
    },
    post: (path, body) => {
      const req = API().req("POST", path, body);
      return API().do(req);
    },
    put: (path, body) => {
      const req = API().req("PUT", path, body);
      return API().do(req);
    },
    patch: (path, body) => {
      const req = API().send("PATCH", path, body);
      return API().do(req);
    },
    delete: (path) => {
      const req = API().send("DELETE", path);
      return API().do(req);
    },
  };
};
