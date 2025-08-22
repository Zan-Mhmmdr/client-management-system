export const userUpdateProfile = async (token:any, name: string) => {
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

export const userUpdatePassword = async (token:any, password: string) => {
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
