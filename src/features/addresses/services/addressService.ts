type AddressCreate = {
    street: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
}

export const addressesCreate = async (token: any, id: any, Address: AddressCreate) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(Address)
    })
}