import { User } from "@/app/utils/types";
import SocializeButtons from "./SocializeButtons";
import UserWrapperNoPosts from "./UserWrapperNoPosts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";

const FriedRequestWrapper = ({ user }: { user: User }) => {
  const userContext = useContext(UserContext);

  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    if (userContext.user) {
      setIsSame(user._id === userContext.user._id);
    }
  }, [userContext, user._id]);
  return (
    <div
      key={user._id}
      className="bg-bgContainers dark:bg-gray-800 text-secondary items-center justify-center gap-1 drop-shadow text-sm"
    >
      <UserWrapperNoPosts currentUser={user} />
      {!isSame && (
        <div className="p-2 dark:bg-gray-800">
          <SocializeButtons user={user} />
        </div>
      )}
    </div>
  );
};

export default FriedRequestWrapper;
