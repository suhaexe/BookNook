import { authClient } from "./auth-client";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const { data, error } = await authClient.token();
  
  if (error || !data) {
    throw new Error("Not logged in");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Something went wrong");
  }

  return res.json();
}