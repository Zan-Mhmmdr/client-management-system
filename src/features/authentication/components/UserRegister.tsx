import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../services/authServices";

export function UserRegister() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
    }

    const userInputData = {
      username,
      name,
      password,
    };

    const response = await userRegister(userInputData);
    const responseBody = await response.json();

    if (responseBody.status === 200) {
      alert("Registration successful! You can now log in.");
      await navigate({
        pathname: "/login",
      });
    } else {
      alert(responseBody.errors);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          Register
        </CardTitle>
        <CardDescription className="text-sm text-[#888]">
          Create your account to get started
        </CardDescription>
        <CardAction>
          <Link to="/login" className="text-white p-0 h-auto text-sm">
            Sign In
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                placeholder="Name"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Confirm password</Label>
              <Input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 mt-4">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium cursor-pointer shadow-md hover:scale-105 transition duration-200"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserRegister;
