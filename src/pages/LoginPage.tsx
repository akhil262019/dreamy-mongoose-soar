import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Define possible user roles for the select dropdown
const roles = ["doctor", "patient", "admin"];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Password field, though not used in mock login
  const [selectedRole, setSelectedRole] = useState<string>("guest"); // Default role

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // Basic validation
    if (!username || selectedRole === "guest") {
      alert("Please enter a username and select a role.");
      return;
    }

    // Simulate login with username and selected role
    login({ username, role: selectedRole as any }); // Cast to UserRole type

    // Redirect based on role
    switch (selectedRole) {
      case "doctor":
        navigate("/doctor-dashboard");
        break;
      case "patient":
        navigate("/patient-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/dashboard"); // Fallback or general dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600">Log in to your account</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="username" className="text-gray-700">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="role" className="text-gray-700 block mb-1">Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize role */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button
              type="submit"
              onClick={handleLogin}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}