export const userRegister = async (user: {
  username: string;
  name: string;
  password: string;
}) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const userLogin = async (user: {
  username: string;
  password: string;
}) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const userLogout = async (token: any) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/logout`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
};
