import HeaderWithIcon from "@/components/common/headerWithICon";
import InputWithIcon from "@/components/common/InputWithIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { contactDetail, contactUpdate } from "../services/contactService";
import { useEffectOnce, useLocalStorage } from "react-use";

const ContactEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, _] = useLocalStorage("token", "");

  const fetchContact = async () => {
    if (!token) return;

    try {
      const response = await contactDetail(token, Number(id));
      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setFirstName(responseBody.data.first_name || "");
        setLastName(responseBody.data.last_name || "");
        setEmail(responseBody.data.email || "");
        setPhone(responseBody.data.phone || "");
      } else {
        alert("Failed to fetch contact details: " + responseBody.errors);
      }
    } catch (error) {
      console.error("Fetch contact error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await contactUpdate(token, {
        id: Number(id),
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      });
      const responseBody = await response.json();
      console.log(responseBody);
      alert("Contact updated successfully!");
    } catch (error) {
      console.error("Update contact error:", error);
    }
  };

  useEffectOnce(() => {
    fetchContact();
  });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <HeaderWithIcon
        backTo="/dashboard/contacts"
        iconClass="fas fa-user-edit"
        backText="Contacts"
        title="Edit Contact"
      />

      <Card className="bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7] mt-6">
        <CardHeader>
          <CardTitle>Edit Contact</CardTitle>
          <CardDescription className="text-[#888]">
            Update contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <InputWithIcon
                id="first_name"
                label="First Name"
                value={firstName}
                iconClass="fas fa-user"
                onChange={(e) => setFirstName(e.target.value)}
                name="first_name"
                placeholder="First Name"
                required
                type="text"
                wrapperClassname="mb-0"
              />
              <InputWithIcon
                id="last_name"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                iconClass="fas fa-user"
                name="last_name"
                placeholder="Last Name"
              />
            </div>
            <div className="mb-5">
              <InputWithIcon
                id="email"
                label="Email"
                type="email"
                value={email}
                iconClass="fas fa-envelope"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>
            <div className="mb-5">
              <InputWithIcon
                iconClass="fas fa-phone"
                id="phone"
                label="Phone"
                type="tel"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Link
                to="/dashboard/contacts"
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                <i className="fas fa-times mr-2" /> Cancel
              </Link>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium hover:scale-105 shadow-md transition"
              >
                <i className="fas fa-save mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactEdit;
