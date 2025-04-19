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


export const apiGetRequest = async (endpoint) => {
  try {
    const url = `${API_URL}/${endpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
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
    const url = `${API_URL}/${endpoint}`;
    const token = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
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
    const url = `${API_URL}/${endpoint}`;
    const token = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
    const url = `${API_URL}/${endpoint}`;
    const token = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Delete failed");
    }

    return { success: true, message: "Delete successful" };
  } catch (error) {
    console.error("API Delete Request Error:", error.message);
    return { success: false, message: error.message };
  }
};


export const apiFormDataPatchRequest = async (endpoint, formData) => {
  try {
    const url = `${API_URL}/${endpoint}`;
    const token = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
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
