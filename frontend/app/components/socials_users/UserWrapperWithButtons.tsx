import { User } from "@/app/utils/types";
import SocializeButtons from "./SocializeButtons";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import UserWrapperNoPosts from "./UserWrapperNoPosts";

const UserWrapperWithButtons = ({ user }: { user: User }) => {
  const userContext = useContext(UserContext);
  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    if (userContext) {
      setIsSame(user._id === userContext.user?._id);
    }
  }, [user._id, userContext]);

  return (
    <div
      key={user._id}
      className="bg-bgContainers dark:bg-gray-800 text-secondary dark:text-gray-300 flex flex-col items-center justify-between gap-2 drop-shadow text-sm"
    >
      <UserWrapperNoPosts currentUser={user} />
      {!isSame && <SocializeButtons user={user} />}
    </div>
  );
};

export default UserWrapperWithButtons;
