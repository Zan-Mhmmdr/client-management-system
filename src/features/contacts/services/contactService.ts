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
    body: JSON.stringify({
      contact,
    }),
  });
};
