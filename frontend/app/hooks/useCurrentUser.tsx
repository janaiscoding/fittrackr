import { useContext, useEffect, useState } from "react";
import { User } from "../__types__/types";
import { UserContext } from "../context/userContext";

// Will extract and return the user from the userContext.
const useCurrentUser = () => {
  const [user, setUser] = useState<User>({} as User);
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (userContext.user) {
      setUser(userContext.user);
    }
  }, [userContext.user]);
  return user;
};

export default useCurrentUser;
