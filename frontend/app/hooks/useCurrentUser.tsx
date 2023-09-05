import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { User } from "../utils/types";

// Will extract and return the user from the userContext.
// Will determine if the userContext has loaded or not. Sets isLoading = false when user object is filled.
// This is helpful for avoiding code repetition in scenarios where a user should NOT be null.
const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [isLoadingUser, setLoadingUser] = useState<boolean>(true);

  const userContext = useContext(UserContext);

  const handleCurrent = (current: User) => {
    setCurrentUser(current);
    setLoadingUser(Object.keys(current).length === 0); // O(n) complexity.
  };

  useEffect(() => {
    if (userContext.user) {
      handleCurrent(userContext.user);
    }
  }, [userContext]);
  return { currentUser, isLoadingUser };
};

export default useCurrentUser;
