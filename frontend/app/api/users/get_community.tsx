import axios from "axios";
import { SetStateAction } from "react";
import { CommunityUser } from "../../__types__/types";
import { getJwtToken } from "../auth/auth_handler";
import { usersAPI } from "../endpoints";

const getCommunity = (
  setter: React.Dispatch<SetStateAction<CommunityUser[]>>,
  currentID: string
) => {
  axios
    .get(usersAPI, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      const community = res.data.users.filter(
        (user: CommunityUser) => user._id !== currentID
      );
      setter(community);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getCommunity;
