import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";

import { User } from "../utils/__types__/types";
import getAllUsers from "../utils/api/users/get_all_users";

const useCommunityGetter = () => {
  const [community, setCommunity] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  
  const { currentUser } = useCurrentUser(); 

  const handleSuccess = (data: User[]) => {
    setCommunity(data);
    setLoading(false);
  };

  useEffect(() => {
    // Filter out the currently logged in user from the community list
    if (currentUser._id) {
      getAllUsers(currentUser._id, handleSuccess);
    }
  }, [currentUser]);

  return { isLoading, community };
};
export default useCommunityGetter;
