import { SetStateAction, useContext, useEffect, useState } from "react";
import { getJwtToken } from "../api/auth_handler";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import { CommunityUser } from "../__types__/types";
import UserComponent from "./User";
import getUsers from "../api/get_users";
import verifyToken from "../api/verify_token";
import FormPost from "../main_page/FormPost";

const UsersComponent = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [users, setUsers] = useState<CommunityUser[]>([]);

  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser, router);
    }
    getUsers(setUsers); //Don't need to refresh this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[87vh] p-6">
      <h1>List of all users</h1>
      {users
        .filter((user) => user._id !== userContext.user?._id) //all except logged in user
        .map((user, i) => (
          <UserComponent key={i} user={user} />
        ))}
      {isShown && <FormPost setShown={setShown} />}
    </div>
  );
};

export default UsersComponent;
