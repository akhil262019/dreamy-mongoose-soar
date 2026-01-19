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
    // TODO: Implement actual login logic and authentication
    // Based on role, navigate to the appropriate dashboard
    if (username === "admin" && password === "admin") {
      navigate("/admin");
    } else if (username === "doctor" && password === "doctor") {
      navigate("/doctor");
    } else {
      navigate("/patient"); // Default to patient if not admin/doctor
    }
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