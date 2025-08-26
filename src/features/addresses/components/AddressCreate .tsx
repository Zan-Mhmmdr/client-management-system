import { use, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router";
import { addressCreate } from "../services/addressService";

interface Contact {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export default function AddAddressForm() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contact = {
      street,
      city,
      province,
      country,
      postal_code: postalCode,
    };

    try {
      const response = await addressCreate(id, contact);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        // Reset form fields
        setStreet("");
        setCity("");
        setProvince("");
        setCountry("");
        setPostalCode("");

        navigate(`/dashboard/contacts/${id}`);
      }
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  return (
    <div>
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to={`/dashboard/contacts/${id}`}
          className="text-sm text-[#63b0c8] hover:underline flex items-center gap-2"
        >
          <i className="fas fa-arrow-left" /> Back to Contact Details
        </Link>
      </div>

      <Card className="w-full max-w-2xl mx-auto bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <i className="fas fa-plus-circle text-[#63b0c8]" />
            Add New Address
          </CardTitle>
          <CardDescription className="text-sm text-[#888]">
            Add address details for{" "}
            <span className="text-white font-medium">
              {contact?.first_name} {contact?.last_name}
            </span>{" "}
            ({contact?.email} / {contact?.phone})
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Street */}
            <div className="grid gap-1">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                name="street"
                type="text"
                placeholder="Enter street address"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
              />
            </div>

            {/* City & Province */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="grid gap-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="province">Province/State</Label>
                <Input
                  id="province"
                  name="province"
                  type="text"
                  placeholder="Enter province/state"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Country & Postal Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="grid gap-1">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Enter country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  type="text"
                  placeholder="Enter postal code"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to={`/dashboard/contacts/${id}`}>
                <Button
                  variant="outline"
                  className="border-[#63b0c8] text-gray-700 hover:bg-[#0F0F0F]/60 hover:text-white cursor-pointer hover:scale-105 transition duration-200"
                >
                  <i className="fas fa-times mr-2 text" /> Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium cursor-pointer shadow-md hover:scale-105 transition duration-200"
              >
                <i className="fas fa-plus-circle mr-2" /> Add Address
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
