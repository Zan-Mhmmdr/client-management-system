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
import { Link } from "react-router-dom";

export function UserRegister() {
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
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-[#1A1A1A] border border-[#333] text-white"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Confirm password</Label>
              <Input
                id="password"
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
          className="w-full bg-[#63b0c8] hover:bg-[#79dbef] text-slate-800 font-medium cursor-pointer"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserRegister;
