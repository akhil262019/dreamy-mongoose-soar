import React, { createContext, useState, useContext, ReactNode } from "react";

// Define possible user roles
type UserRole = "doctor" | "patient" | "admin" | "guest";

// Define the structure of the user object
interface User {
  id: string;
  username: string;
  role: UserRole;
}

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Omit<User, 'id'> & { role: UserRole }) => void; // Added role to login payload
  logout: () => void;
  role: UserRole; // Explicitly include role in context
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>("guest"); // Default role is guest

  const isAuthenticated = !!user;

  const login = (userData: Omit<User, 'id'> & { role: UserRole }) => {
    // In a real app, you'd verify credentials against a backend
    // For simulation, we'll just set the user and role
    const newUser: User = {
      id: `user-${Date.now()}`, // Simple mock ID
      username: userData.username,
      role: userData.role,
    };
    setUser(newUser);
    setRole(userData.role);
    console.log(`User logged in: ${newUser.username} with role: ${newUser.role}`);
  };

  const logout = () => {
    setUser(null);
    setRole("guest");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};