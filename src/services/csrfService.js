import api from "./api";

const CsrfService = {
  getToken: () => api.post("/session/token", null, {
    headers: { "Content-Type": "application/json" },
    params: { _format: "json" }
  })
};

export default CsrfService;
