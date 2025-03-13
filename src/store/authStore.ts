import { create } from 'zustand';
import { User } from '../types/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data); // Verifique o que está sendo retornado

            if (data.user) {
              set({ user: data.user, isAuthenticated: true });
              console.log(localStorage)
              localStorage.setItem('ecovivaUser', JSON.stringify(data.user));
              console.log(localStorage)
              console.log('User saved to localStorage');
              resolve(true);
            } else {
              console.log('No user data found in response');
              resolve(false);
            }
          } else {
            console.log('Login failed with status:', response.status);
            resolve(false);
          }
        } catch (error) {
          console.error('Error during login:', error);
          resolve(false);
        }
      }, 800);
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('ecovivaUser');
    console.log('User logged out and localStorage cleared');
  },

  initAuth: () => {
    const storedUser = localStorage.getItem('ecovivaUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
        console.log('User loaded from localStorage');
      } 
      catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('ecovivaUser');
      }
    }
  },
}));

// Initialize authentication on app load
useAuthStore.getState().initAuth();
