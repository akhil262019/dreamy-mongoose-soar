import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient"); // Default role is patient
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", { username, password, role });
    // TODO: Implement actual registration logic
    alert("Registration successful! Please log in.");
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
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
      <div>
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={setRole} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">Patient</SelectItem>
            <SelectItem value="doctor">Doctor</SelectItem>
            {/* Admin role is pre-existing and not for registration */}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Register
      </Button>
      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button type="button" className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>
          Log in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;