type AddressData = {
  street: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
};

export const addressCreate = async (contactId: number, addressData: AddressData) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/users/contacts/${contactId}/addresses`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addressData),
    }
  );
};
