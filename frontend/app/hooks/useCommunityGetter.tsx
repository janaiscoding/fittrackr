import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";

import { User } from "../__types__/types";
import getAllUsers from "../api/users/get_all_users";

const useCommunityGetter = () => {
  const [community, setCommunity] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    // Filter out the currently logged in user from the community list
    if (currentUser._id) {
      getAllUsers(setCommunity, currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    // Helper for loading, triggers when the community array is updated.
    if (community.length > 0) {
      setLoading(false);
    }
  }, [community]);

  return { isLoading, community };
};
export default useCommunityGetter;
