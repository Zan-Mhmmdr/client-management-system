import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";

const AddressEdit = () => {
  const { id, addressId } = useParams();
  const [contact, setContact] = useState<any>({});
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [token, _] = useLocalStorage("token");
  const navigate = useNavigate();

const updatedAddressData = {
  id: addressId,
  street,
  city,
  province,
  postal_code: postal_code,
  country,
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        await alertSuccess("Address created successfully!");

        // No need to await navigation unless it’s a custom async function
        navigate(`/dashboard/contacts/${id}`);
        
      } else {
        const errorMessage = responseBody?.errors || "Something went wrong.";
        await alertError(errorMessage);
      }
    } catch (error: any) {
      console.error("Submission failed:", error);
      await alertError("An unexpected error occurred. Please try again.");
    }
  };

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

  useEffectOnce(() => {
    fetchContact().then(() => {
      console.log("Edit Address fetched successfully");
    });

    fetchAddress().then(() => {
      console.log("Address fetched successfully");
    });
  });

const AddressEdit = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to={`/dashboard/contacts/${id}`}
          className="text-blue-500 hover:underline flex items-center"
        >
          ← Back to Contact Details
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Edit Address
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <i className="fas fa-user" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {contact.first_name} {contact.last_name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {contact.email} • {contact.phone}
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province/State</Label>
                <Input
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Enter province or state"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  value={postal_code}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter postal code"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link to={`/dashboard/contacts/${id}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressEdit;
