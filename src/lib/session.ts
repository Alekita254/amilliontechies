// The browser session, stored under the same keys the admin login uses.
export type StoredUser = {
  id?: number;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
};

export function saveSession(data: { user: unknown; tokens: { access: string; refresh: string } }): void {
  localStorage.setItem("accessToken", data.tokens.access);
  localStorage.setItem("refreshToken", data.tokens.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export function hasSession(): boolean {
  return !!localStorage.getItem("accessToken");
}

export function getStoredUser(): StoredUser | null {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function signOut(): void {
  ["accessToken", "refreshToken", "user"].forEach((k) => localStorage.removeItem(k));
}
