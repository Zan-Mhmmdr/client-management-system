import InputWithIcon from "@/components/common/InputWithIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addressUpdate } from "../services/addressService";
import { useEffectOnce } from "react-use";

const AddressEdit = () => {
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const navigate = useNavigate();

  const fetchContact = async () => {
    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        setContact(responseBody.data);
      } else {
        await alertError(
          responseBody.errors || "An error occurred while fetching contact."
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      await alertError("Network or server error. Please try again later.");
    }
  };

  const fetchAddress = async () => {
    const response = await addressesDetail(token, id, addressId);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setStreet(responseBody.data.street);
      setCity(responseBody.data.city);
      setProvince(responseBody.data.province);
      setCountry(responseBody.data.country);
      setPostalCode(responseBody.data.postal_code);
    } else {
      await alertError(responseBody.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addressUpdate(token, id, updatedAddressData);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        // Clear form fields
        setStreet("");
        setCity("");
        setProvince("");
        setCountry("");
        setPostalCode("");

        alert("Address created successfully!");

        // No need to await navigation unless it’s a custom async function
        navigate(`/dashboard/contacts/${id}`);
      } else {
        const errorMessage = responseBody?.errors || "Something went wrong.";
        alert(errorMessage);
      }
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

    useEffectOnce(() => {
    fetchContact().then(() => {
      console.log("Edit Address fetched successfully");
    });

    fetchAddress().then(() => {
      console.log("Address fetched successfully");
    });
  });


  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-8 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 bg-gradient rounded-full mb-4">
            <i className="fas fa-map-marker-alt text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Edit Address</h1>
          <p className="text-gray-300 mt-2">Update your contact's address</p>
        </div>

        {/* Contact Information */}
        <div className="mb-6 border-b border-gray-700 pb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
              <i className="fas fa-user text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {contact.first_name} {contact.last_name}
              </h2>
              <p className="text-gray-300 text-sm">
                {contact.email} • {contact.phone}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <InputWithIcon
            wrapperClassname="mb-5"
            label="Street"
            iconClass="fas fa-road"
            name="street"
            placeholder="Enter street address"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            id="street"
            type="text"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <InputWithIcon
              wrapperClassname=""
              label="City"
              id="city"
              iconClass="fas fa-city"
              name="city"
              placeholder="Enter city"
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <InputWithIcon
              wrapperClassname=""
              id="province"
              label="Province/State"
              iconClass="fas fa-map"
              type="text"
              name="province"
              placeholder="Enter province or state"
              required
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <InputWithIcon
              wrapperClassname=""
              id="country"
              label="Country"
              iconClass="fas fa-flag"
              type="text"
              name="country"
              placeholder="Enter country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <InputWithIcon
              wrapperClassname=""
              id="postal_code"
              label="Postal Code"
              iconClass="fas fa-mail-bulk"
              type="text"
              name="postal_code"
              placeholder="Enter postal code"
              required
              value={postal_code}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              to={`/dashboard/contacts/${id}`}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center"
            >
              <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
            </Link>

            <div className="flex space-x-4">
              <Link
                to={`/dashboard/contacts/${id}`}
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
              >
                <i className="fas fa-times mr-2" /> Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-save mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
