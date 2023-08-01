/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useContext, useEffect, useState } from "react";
import { getJwtToken } from "../../api/auth/auth_handler";
import { UserContext } from "../../context/userContext";
import { CommunityUser } from "../../__types__/types";
import UserComponent from "./User";
import getUsers from "../../api/users/get_users";
import FormPost from "../forms/FormPost";

const UsersComponent = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [users, setUsers] = useState<CommunityUser[]>([]);
  const userContext = useContext(UserContext) 
  
  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <div className="min-h-[87vh] p-6">
      {Object.keys(users).length === 0 && "Loading animation"}
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
