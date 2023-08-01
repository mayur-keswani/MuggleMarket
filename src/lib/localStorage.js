export const getAuthDetails = () => {
  const auth = localStorage?.getItem("auth") ?? {};
  if (!!Object.keys(auth).length) {
    return JSON.parse(auth);
  } else return null;
};
export const clearLocalStorage = async () => {
  await localStorage.clear();
};

export const setLocalCartItems = async (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const getUserLocalLocation = async () => {
  let items = JSON.parse(localStorage.getItem("location"));
  return (items)
};