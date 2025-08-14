export async function fetchArticles({ setArticles, setLoading }) {
  try {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    const response = await fetch(
      "https://tamkeen-dev.com/api/blogs-api?items_per_page=5",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoaToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setArticles(data.rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    setLoading(false);
  }
}

export async function fetchUserArticles({ setArticles, setLoading }) {
  try {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    const response = await fetch(
      "https://tamkeen-dev.com/api/blogs-api-current-user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoaToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setArticles(data.rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    setLoading(false);
  }
}
