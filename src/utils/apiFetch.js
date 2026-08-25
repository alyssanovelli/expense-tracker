const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return null;
    }

    return response;
}