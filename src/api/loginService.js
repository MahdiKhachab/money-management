// src/services/loginService.js

import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  const data = await res.json();

  if (!data.token) {
    throw new Error("No token received");
  }

  // Decode token to get username or any other info
  const decoded = jwtDecode(data.token);
  const extractedUsername = decoded.username || decoded.sub || "User";

  // Store in localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", extractedUsername);

  return { token: data.token, username: extractedUsername };
};
