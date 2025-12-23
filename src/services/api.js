const BASE_URL = "https://tamkeen-dev.com/api/user";

// Store CSRF token in memory
let csrfToken = null;

// 🔹 Fetch CSRF token when needed
async function getCsrfToken() {
  if (!csrfToken) {
    const res = await fetch(`${BASE_URL}/session/token`, {
      method: "POST", // or "GET" if your backend expects GET
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`CSRF token request failed: ${res.status}`);
    csrfToken = await res.text(); // Drupal returns token as plain text
  }
  return csrfToken;
}

// 🔹 Main reusable fetch function
export async function apiFetch(
  endpoint,
  { method = "GET", body, headers = {}, requireCsrf = false } = {}
) {
  const token = localStorage.getItem("apiToken");

  if (requireCsrf) {
    const csrf = await getCsrfToken();
    headers["X-CSRF-Token"] = csrf;
    console.log("This is the csrf token: " + csrf);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}
