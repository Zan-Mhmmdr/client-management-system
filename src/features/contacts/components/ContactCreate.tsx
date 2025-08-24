import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactCreate } from "../services/contactService";
import { useLocalStorage } from "react-use";

const ContactCreate = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const CreateContactData = {
    first_name,
    last_name,
    email,
    phone,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await contactCreate(token, CreateContactData);
    const responseBody = await response.json();
    console.log(responseBody);

    if (responseBody.status !== 200) {
      alert("Failed to create contact: " + responseBody.errors);
      return;
    } else {
      alert("Contact created successfully!");
      navigate("/dashboard/contacts");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          Create New Contact
        </CardTitle>
        <CardDescription className="text-sm text-[#888]">
          Fill in the details to add a new contact.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                placeholder="Enter first name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Enter last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
            />
          </div>
          <CardFooter className="flex justify-end gap-3 mt-4 p-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/contacts")}
              className="border-[#63b0c8] text-slate-800 hover:bg-[#0F0F0F]/60 hover:text-white cursor-pointer hover:scale-105 transition duration-200"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium shadow-md hover:scale-105 transition duration-200"
            >
              Create Contact
            </Button>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactCreate;
