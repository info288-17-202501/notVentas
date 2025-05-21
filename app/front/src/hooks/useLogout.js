'use client';

export const useLogout = () => {
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return { logout };
};
