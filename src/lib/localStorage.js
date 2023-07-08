export const getAuthDetails = () => {
  const auth = localStorage?.getItem("auth") ?? {};
  console.log(!!Object.keys(auth));
  if (!!Object.keys(auth).length) {
    console.log("here");
    return JSON.parse(auth);
  } else return null;
};
export const clearLocalStorage = async () => {
  await localStorage.clear();
};
