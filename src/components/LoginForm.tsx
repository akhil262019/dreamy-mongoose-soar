import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });

    let role: string;
    let targetPath: string;

    // Placeholder logic for role determination
    if (username === "admin" && password === "admin") {
      role = "admin";
      targetPath = "/admin";
    } else if (username === "doctor" && password === "doctor") {
      role = "doctor";
      targetPath = "/doctor";
    } else {
      // Assume any other valid credentials are for a patient
      role = "patient";
      targetPath = "/patient";
    }

    // Simulate successful login by storing role in localStorage
    // The Navbar component uses this to determine login state and role.
    localStorage.setItem("userRole", role);

    // Navigate to the appropriate dashboard
    navigate(targetPath);

    // Note: For immediate UI updates in Navbar without a page refresh,
    // a global state management solution (like Context API or Zustand) would be needed.
    // For this simulation, localStorage + Navbar's useEffect on next render is sufficient.
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <div className="text-center text-sm text-gray-500">
        Forgot password?{" "}
        <button type="button" className="text-blue-600 hover:underline">
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default LoginForm;