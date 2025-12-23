const BASE_URL = "https://tamkeen-dev.com/api/user";

export async function apiFetch(
  endpoint,
  { method = "GET", body, headers = {} } = {}
) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}
