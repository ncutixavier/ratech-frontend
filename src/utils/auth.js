export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};
