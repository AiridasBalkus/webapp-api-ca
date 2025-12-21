const API = "http://localhost:8080/api/users";

//signup user(regiser)
export const signup = async(username, password) => {
    const res = await fetch(`${API}?action=register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Signup failed try again!");
    }
    return data;
};
//login user(authenticate)
export const login = async (username, password) => {
    const res = await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username : username, password : password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Login failed try again!");
    }
    return data;
};