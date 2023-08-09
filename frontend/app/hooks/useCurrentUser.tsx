import { useContext, useEffect, useState } from "react";
import { User } from "../__types__/types";
import { UserContext } from "../context/userContext";

// Will extract and return the user from the userContext.
// Will determine if the userContext has loaded or not. Sets isLoading = false when user object is filled.
// This is helpful for avoiding code repetition in scenarios where a user should not be null.
const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [isLoadingUser, setLoadingUser] = useState<boolean>(true);

  const userContext = useContext(UserContext);

  const handleCurrent = (current: User) => {
    setCurrentUser(current);
    setLoadingUser(Object.keys(current).length === 0); // O(n) complexity
  };

  useEffect(() => {
    if (userContext.user) {
      handleCurrent(userContext.user);
    }
  }, [userContext]);
  return { currentUser, isLoadingUser };
};

export default useCurrentUser;
