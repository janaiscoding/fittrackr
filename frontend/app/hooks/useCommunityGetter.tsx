import { useEffect, useState } from "react";
import { CommunityUser } from "../__types__/types";
import useCurrentUser from "./useCurrentUser";
import getCommunity from "../api/users/get_community";

const useCommunityGetter = () => {
  const [community, setCommunity] = useState<CommunityUser[]>([]);
  const [isLoading, setLoading] = useState(true);
  const currentUser = useCurrentUser();
  console.log(community)
  useEffect(() => {
    // Filter out the currently logged in user from the community list
    if (currentUser._id) {
      getCommunity(setCommunity, currentUser._id);
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
