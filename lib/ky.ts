import ky from "ky";

const api = ky.create({
  prefixUrl:
    process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "",
  timeout: 30_000,
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "patch", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Extend headers or auth tokens here when needed.
        return request;
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // Global response handling lives here if required.
        return response;
      },
    ],
  },
});

export default api;
