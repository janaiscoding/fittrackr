import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

// Will determine if the userContext has loaded or not. Sets isLoading = false when user object is filled.
const useLoadingUser = () => {
  const [isLoadingUser, setLoadingUser] = useState<boolean>(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      setLoadingUser(Object.keys(userContext.user).length === 0); //O(n) complexity
    }
  }, [userContext]);

  return isLoadingUser;
};

export default useLoadingUser;
