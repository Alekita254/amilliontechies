// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  

function readSession(): User | null {
  try {
    const token = localStorage.getItem('accessToken');
    const raw = localStorage.getItem('user');
    if (!token || !raw) return null;
    const u = JSON.parse(raw);
    // Display/routing only; the backend enforces access via the JWT.
    return {
      id: String(u.id),
      name: `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || u.username,
      email: u.email,
      role: u.is_staff ? 'admin' : 'user',
    };
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(readSession);

  const logout = () => {
    ['accessToken', 'refreshToken', 'user'].forEach((k) => localStorage.removeItem(k));
    setUser(null);
  };

  return { user, isAuthenticated: !!user, loading: false, logout };
}
