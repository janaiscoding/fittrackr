import Loader from "@/app/utils/assets/Loader";
import useCommunityGetter from "@/app/hooks/useCommunityGetter";
import UserWrapper from "./UserWrapper";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/app/context/userContext";
import { User } from "@/app/utils/types";
import getAllUsers from "@/app/utils/api/users/get_all_users";

const CommunityUsers = () => {
  const [community, setCommunity] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);

  const userContext = useContext(UserContext);
  const handleSuccess = (data: User[]) => {
    setLoading(false);
    setCommunity(data);
  };
  useEffect(() => {
    // Filter out the currently logged in user from the community list
    if (userContext.user) {
      getAllUsers(userContext.user._id, handleSuccess);
    }
  }, [userContext.user]);

  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {!isLoading && community.length === 0 && (
        <p className="w-full self-center text-secondary bg-bgContainers p-2 drop-shadow">
          You are alone for now...
        </p>
      )}
      {community.map((user) => (
        <UserWrapper user={user} key={user._id} />
      ))}
    </div>
  );
};
export default CommunityUsers;
