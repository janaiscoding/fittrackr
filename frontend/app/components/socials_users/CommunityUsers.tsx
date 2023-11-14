import Loader from "@/app/utils/assets/Loader";
import UserWrapper from "./UserWrapper";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/app/context/userContext";
import { User } from "@/app/utils/types";
import getAllUsers from "@/app/utils/api/users/get_all_users";
import UserWrapperCommunityPage from "./UserWrapperCommunityPage";

const CommunityUsers = () => {
  const [community, setCommunity] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);

  const userContext = useContext(UserContext);
  const handleSuccess = (data: User[]) => {
    setLoading(false);
    setCommunity(data);
  };
  // useEffect(() => {
  //   // Filter out the currently logged in user from the community list
  //   if (userContext.user) {
  //     getAllUsers(userContext.user._id, handleSuccess);
  //   }
  // }, [userContext.user]);
  useEffect(() =>{
    getAllUsers(handleSuccess)
  },[])
  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {!isLoading && community.length === 0 && (
        <p className="w-full self-center text-secondary dark:text-gray-300 bg-bgContainers dark:bg-gray-800 p-2 drop-shadow">
          You are alone for now...
        </p>
      )}
      {community.filter((u) => u._id !== userContext.user?._id).map((user) => (
        <UserWrapperCommunityPage user={user} key={user._id} />
      ))}
    </div>
  );
};
export default CommunityUsers;
