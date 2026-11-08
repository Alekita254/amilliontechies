import { API_URL } from "./names";

// ---- Session handling -------------------------------------------------------
// Access tokens are short-lived. Before a request we refresh one that is about
// to expire, and if the server still answers 401 we refresh once and retry.
// If the refresh token is no longer valid, the session ends and the admin is
// sent to the login page.

const SESSION_KEYS = ["accessToken", "refreshToken", "user"];

const expiresAt = (token) => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).exp * 1000;
  } catch {
    return 0;
  }
};

let refreshing = null;

// One refresh at a time, shared by any requests that fire together.
const refreshAccessToken = () => {
  if (!refreshing) {
    refreshing = (async () => {
      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) return false;
      try {
        const res = await fetch(`${API_URL}/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        localStorage.setItem("accessToken", data.access);
        if (data.refresh) localStorage.setItem("refreshToken", data.refresh);
        return true;
      } catch {
        return false;
      }
    })().finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
};

const endSession = () => {
  SESSION_KEYS.forEach((k) => localStorage.removeItem(k));
  const path = window.location.pathname;
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    window.location.assign("/admin/login");
  }
};

const currentToken = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  if (expiresAt(token) - Date.now() > 30_000) return token;
  if (await refreshAccessToken()) return localStorage.getItem("accessToken");
  endSession();
  return null;
};

// fetch() that sends the access token when there is one.
const authFetch = async (url, init = {}) => {
  const send = (token) =>
    fetch(url, {
      ...init,
      headers: { ...init.headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });

  let res = await send(await currentToken());
  if (res.status === 401 && localStorage.getItem("refreshToken")) {
    if (await refreshAccessToken()) res = await send(localStorage.getItem("accessToken"));
    if (res.status === 401) endSession();
  }
  return res;
};

// ---- Request helpers --------------------------------------------------------

export const apiPostRequest = async (endpoint, data) => {
  try {
    const response = await authFetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.detail || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Post Request Error:", error.message);
    throw error;
  }
};


export const apiGetRequest = async (endpoint) => {
  try {
    const response = await authFetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.detail || "Something went wrong");
    }

    return { message: "Request successful", data: result };

  } catch (error) {
    console.error("API Get Request Error: ", error.message);
    return { message: error.message || "An error occurred", data: null};

  }
};


export const fetchJoinUsConfig = async () => {
  const res = await apiGetRequest("joinus/config");
  return res.data;
};


export const submitJoinUsForm = async (formData) => {
  return await apiPostRequest("joinus/submit/", formData);
};


export const apiFormDataPostRequest = async (endpoint, formData) => {
  try {
    const response = await authFetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error("API FormData Post Error:", error.message);
    throw error;
  }
};


export const apiPatchRequest = async (endpoint, data) => {
  try {
    const response = await authFetch(`${API_URL}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Update failed");
    }

    return result;
  } catch (error) {
    console.error("API Patch Request Error:", error.message);
    throw error;
  }
};


export const apiDeleteRequest = async (endpoint) => {
  try {
    const response = await authFetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.detail || "Delete failed");
    }

    return { success: true, message: "Delete successful" };
  } catch (error) {
    console.error("API Delete Request Error:", error.message);
    return { success: false, message: error.message };
  }
};


export const apiFormDataPatchRequest = async (endpoint, formData) => {
  try {
    const response = await authFetch(`${API_URL}/${endpoint}`, {
      method: "PATCH",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error("API FormData Patch Error:", error.message);
    throw error;
  }
};
