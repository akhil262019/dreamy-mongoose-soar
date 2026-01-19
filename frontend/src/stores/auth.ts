import { defineStore } from 'pinia';
import apiClient from '@/services/api'; // Import your configured Axios instance

interface User {
  id: number;
  username: string;
  role: string; // e.g., 'admin', 'doctor', 'patient'
  profile?: { name: string; [key: string]: any }; // Optional profile details
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // token: string | null; // Uncomment if using JWT tokens
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    // token: null,
  }),
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        if (response.data && response.data.message === 'Login successful') {
          this.user = response.data.user;
          this.isAuthenticated = true;
          // If using JWT, store the token: this.token = response.data.token;
          return true; // Indicate success
        }
        return false; // Indicate failure
      } catch (error) {
        console.error('Login failed:', error);
        this.logout(); // Clear state on error
        return false; // Indicate failure
      }
    },
    async register(userData: any) { // Adjust userData type as needed
      try {
        const response = await apiClient.post('/auth/register', userData);
        if (response.data && response.data.message === 'User registered successfully') {
          // Optionally auto-login after registration or just confirm success
          return true;
        }
        return false;
      } catch (error) {
        console.error('Registration failed:', error);
        return false;
      }
    },
    async logout() {
      try {
        await apiClient.post('/auth/logout');
      } catch (error) {
        console.error('Logout request failed:', error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
        // this.token = null;
      }
    },
    async checkAuth() {
      try {
        // This endpoint checks the current session status
        const response = await apiClient.get('/auth/check_auth');
        if (response.data.authenticated) {
          this.user = response.data.user; // Update user info from session
          this.isAuthenticated = true;
          return true;
        } else {
          this.logout(); // Ensure state is clean if session is invalid
          return false;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        this.logout(); // Clear state on error
        return false;
      }
    },
    // Method to directly set user if needed, e.g., from initial check
    setUser(userData: User | null) {
      this.user = userData;
      this.isAuthenticated = !!userData;
    }
  },
});