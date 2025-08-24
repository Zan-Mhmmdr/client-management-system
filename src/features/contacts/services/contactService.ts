export const userDetail = async (token: any) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: token,
    },
  });
};

export const userUpdateProfile = async (token: any, name: string) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      name,
    }),
  });
};

export const userUpdatePassword = async (token: any, password: string) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      password,
    }),
  });
};

interface ContactCreateProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const contactCreate = async (
  token: any,
  contact: ContactCreateProps
) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: token,
    },
    body: JSON.stringify(contact),
  });
};

interface ContactListData {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
}

export const contactList = async (token: any, contact: ContactListData) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`);

  if (contact.name) url.searchParams.append("name", contact.name);
  if (contact.email) url.searchParams.append("email", contact.email);
  if (contact.phone) url.searchParams.append("phone", contact.phone);
  if (contact.page) url.searchParams.append("page", contact.page.toString());

  return await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const contactDetail = async (token: any, contactId: number) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const contactDelete = async (token: any, contactId: number) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
};

type dataContact = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export const contactUpdate = async (token: any, contact: dataContact) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/contacts/${contact.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(contact),
    }
  );
};
