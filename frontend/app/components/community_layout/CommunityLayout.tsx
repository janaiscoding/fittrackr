import Loader from "@/app/utils/assets/Loader";
import UserWrapper from "../socials_users/UserWrapper";
import getAllUsers from "@/app/utils/api/users/get_all_users";
import { useContext, useEffect, useState } from "react";
import { User } from "@/app/utils/types";
import UserWrapperCommunityPage from "../socials_users/UserWrapperCommunityPage";
import { UserContext } from "@/app/context/userContext";

const CommunityLayout = () => {
  const [community, setCommunity] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  const currentUser = useContext(UserContext);

  const handleSuccess = (data: User[]) => {
    setLoading(false);
    setCommunity(data);
  };

  useEffect(() => {
    getAllUsers(handleSuccess);
  }, []);

  return (
    <div className="basis-full">
      <h1 className="text-2xl text-secondary dark:text-gray-300 text-center">
        Users on Socializer
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap font-ubuntu gap-3">
        {isLoading && <Loader />}
        {!isLoading && community.length === 0 && (
          <p className="w-full self-center bg-bgContainers dark:bg-gray-800 p-2 rounded">
            You are alone for now...
          </p>
        )}
        {community
          .filter((user) => user._id !== currentUser.user?._id)
          .map((user, i) => (
            <UserWrapperCommunityPage user={user} key={i} />
          ))}
      </div>
    </div>
  );
};

export default CommunityLayout;
