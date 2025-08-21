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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/authServices";
import { useLocalStorage } from "react-use";

export function UserLogin() {
  const [usernname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [__, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const response = await userLogin({ username, password });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.errors);
        return;
      }

      const data = await response.json();
      const token = data?.data?.token;

      if (token) {
        setToken(token);
        navigate({
          pathname: "/dashboard",
        });
      } else {
        alert("Token not found in a response ");
      }
    } catch (error) {}
  };

  return (
    <Card className="w-full max-w-sm bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          Login
        </CardTitle>
        <CardDescription className="text-sm text-[#888]">
          Enter your Username and password
        </CardDescription>
        <CardAction>
          <Link to="/register" className="text-white p-0 h-auto text-sm">
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={usernname}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>

        <Button
          variant="outline"
          className="w-full border-[#63b0c8] text-slate-800 hover:bg-[#0F0F0F]/60 hover:text-white cursor-pointer hover:scale-105 transition duration-200"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserLogin;
