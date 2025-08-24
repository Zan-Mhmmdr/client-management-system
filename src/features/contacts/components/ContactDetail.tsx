import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDelete, contactDetail } from "../services/contactService";

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<any>({});
  const [token, _] = useLocalStorage("token", "");
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffectOnce(() => {
    try {
      if (token && id) {
        fetchContact();
      }
    } catch (error) {
      console.error("Fetch contact error:", error);
    }
  });

  const fetchContact = async () => {
    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setContact(responseBody.data);
        setAddresses(responseBody.data.addresses || []);
      } else {
        alert("Failed to fetch contact: " + responseBody.errors);
      }
    } catch (error) {
      console.error("Fetch contact error:", error);
    }
  };
  
  const handleContactDelete = async (id: string | number) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    const response = await contactDelete(token, id);
    const responseBody = await response.json();
    console.log(responseBody);
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7]">
        <CardHeader>
          <CardTitle className="text-white text-2xl mb-2">
            Contact Detail
          </CardTitle>
          <p className="text-sm text-[#888]">
            View and manage contact and address info
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#888] text-sm">First Name</p>
              <p>{contact.first_name}</p>
            </div>
            <div>
              <p className="text-[#888] text-sm">Last Name</p>
              <p>{contact.last_name}</p>
            </div>
          </div>
          <div>
            <p className="text-[#888] text-sm">Email</p>
            <p>{contact.email}</p>
          </div>
          <div>
            <p className="text-[#888] text-sm">Phone</p>
            <p>{contact.phone}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 flex-wrap">
          <Link to="/dashboard/contacts">
            <Button
              variant="outline"
              className="border-[#63b0c8] text-white hover:bg-[#1a1a1a]/60"
            >
              Back
            </Button>
          </Link>
          <Link to={`/dashboard/contacts/${id}/edit`}>
            <Button className="bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium hover:scale-105 transition duration-200">
              Edit Contact
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Address Cards */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-lg">Addresses</h3>
          <Link to={`/dashboard/contacts/${id}/addresses/create`}>
            <Button className="bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium hover:scale-105 transition duration-200">
              Add Address
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className="bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7]"
            >
              <CardHeader>
                <CardTitle className="text-md text-white">
                  Home Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-[#ccc]">
                <p>
                  <strong>Street:</strong> {address.street}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>Province:</strong> {address.province}
                </p>
                <p>
                  <strong>Country:</strong> {address.country}
                </p>
                <p>
                  <strong>Postal Code:</strong> {address.postal_code}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Link
                  to={`/dashboard/contacts/${id}/addresses/${address.id}/edit`}
                >
                  <Button className="bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 hover:scale-105">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleContactDelete(address.id)}
                  className="hover:scale-105"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
