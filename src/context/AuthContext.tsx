import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define possible user roles
export type UserRole = "doctor" | "patient" | "admin" | "guest";

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
  login: (userData: Omit<User, 'id'> & { role: UserRole }) => void;
  logout: () => void;
  role: UserRole;
  isAdmin: boolean; // Helper for easier checks
  isDoctor: boolean;
  isPatient: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

// Default admin user that will be created if no user is found in localStorage
const defaultAdminUser: User = { id: "admin-001", username: "system_admin", role: "admin" };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Basic validation to ensure it's a valid user object structure
        if (parsedUser && parsedUser.username && parsedUser.role) {
          return parsedUser;
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      // Clear potentially corrupted data
      localStorage.removeItem("authUser");
    }
    // If no user in localStorage or parsing failed, return default admin
    return defaultAdminUser;
  });

  const [role, setRole] = useState<UserRole>(() => user?.role || "guest");

  // Effect to synchronize localStorage with user state and update role
  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      setRole(user.role);
    } else {
      localStorage.removeItem("authUser");
      setRole("guest");
    }
  }, [user]); // Re-run effect if user changes

  const isAuthenticated = !!user;
  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  const login = (userData: Omit<User, 'id'> & { role: UserRole }) => {
    const newUser: User = {
      id: `user-${Date.now()}`, // Simple mock ID generation
      username: userData.username,
      role: userData.role,
    };
    setUser(newUser);
    // Role is set in the useEffect hook based on the new user object
    console.log(`User logged in: ${newUser.username} with role: ${newUser.role}`);
  };

  const logout = () => {
    setUser(null);
    // Role is set to 'guest' in the useEffect hook
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, role, isAdmin, isDoctor, isPatient }}>
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