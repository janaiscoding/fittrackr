/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getJwtToken, removeJwtToken } from "../utils/api/auth/auth_handler";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import verifyToken from "../utils/api/auth/verify_token";
import { User } from "../utils/types";

// Handles the logic for verifying token. Will set the user for valid, and clean-up if invalid. Returns valid boolean.
const useTokenVerification = () => {
  const [valid, setValid] = useState<boolean>();

  const router = useRouter();
  const userContext = useContext(UserContext);

  const handleAuthorized = (user: User) => {
    userContext.setUser(user);
    setValid(true);
  };

  const handleUnauthorized = () => {
    // Remove the expired/invalid token and redirect to main page/login
    removeJwtToken();
    userContext.setUser(null);
    router.push("/login");
    setValid(false);
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, handleAuthorized, handleUnauthorized);
    }
  }, []);

  return valid;
};

export default useTokenVerification;
