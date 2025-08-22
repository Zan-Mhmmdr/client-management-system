import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import {
  userUpdatePassword,
  userUpdateProfile,
} from "../services/contactService";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, _] = useLocalStorage("token", "");

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await userUpdateProfile(token, name);
    const responseBody = await response.json();
    console.log(responseBody);

    if (responseBody.status === 200) {
      alert("Failed to update profile: " + responseBody.errors);
      return;
    } else {
      alert("Profile updated successfully!");
      setName("");
    }
  };

  const handleSubmitPassword = async () => {
    if (password !== confirmPassword) {
      alert("Password tidak boleh sama!");
    }

    const response = await userUpdatePassword(token, password);
    const responseBody = await response.json();
    console.log(responseBody);

    if (responseBody.status === 200) {
      alert("Failed to update password: " + responseBody.errors);
      return;
    } else {
      alert("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
      </div>

      {/* Grid for forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Edit Profile Form */}
        <Card className="bg-[#1A1A1A] border border-[#333] text-[#EAEAEA] shadow-[0_0_12px_#63b0c8]/30">
          <CardHeader>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-user-edit text-white" />
              </div>
              <CardTitle className="text-xl text-white">Edit Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitProfile} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="bg-[#1A1A1A] border border-[#444] text-white placeholder-gray-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium shadow-md hover:scale-105 transition duration-200"
              >
                <i className="fas fa-save mr-2" />
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password Form */}
        <Card className="bg-[#1A1A1A] border border-[#333] text-[#EAEAEA] shadow-[0_0_12px_#8c63c8]/30">
          <CardHeader>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-key text-white" />
              </div>
              <CardTitle className="text-xl text-white">
                Change Password
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPassword} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="new_password"
                  type="password"
                  name="new_password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  className="bg-[#1A1A1A] border border-[#444] text-white placeholder-gray-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                  className="bg-[#1A1A1A] border border-[#444] text-white placeholder-gray-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8c63c8] to-[#b79def] text-slate-800 font-medium shadow-md hover:scale-105 transition duration-200"
              >
                <i className="fas fa-key mr-2" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
