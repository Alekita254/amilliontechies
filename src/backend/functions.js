import { API_URL } from "./names";

export const apiPostRequest = async (endpoint, data) => {
  try {
    const url = `${API_URL}/${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Post Request Error:", error.message);
    throw error;
  }
};
