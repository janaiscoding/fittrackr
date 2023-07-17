const getJwtToken = () => {
  return sessionStorage.getItem("JWT_TOKEN");
};
const setJwtToken = (token: string) => {
  return sessionStorage.setItem("JWT_TOKEN", token);
};

export { getJwtToken, setJwtToken };
