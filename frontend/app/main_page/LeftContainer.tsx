import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { User } from "../__types__/types";

const LeftContainer = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      setLoading(Object.keys(userContext.user).length === 0); //O(n) complexity
      setUser(userContext.user);
    }
    console.log("logged user loaded")
  }, [userContext.user]);

  return (
    <div className="hidden md:block">
      {isLoading ? (
        "Loading animation for user profile"
      ) : (
        <div>
          {user.first_name} {user.last_name}
        </div>
      )}
    </div>
  );
};

export default LeftContainer;
