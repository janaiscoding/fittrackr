import { User } from "@/app/utils/types";
import UserContent from "./UserContent";

import { useContext, useEffect, useState } from "react";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import getProfile from "@/app/utils/api/users/get_profile";
import Loader from "@/app/utils/assets/Loader";
import { useRouter } from "next/navigation";
import UserTabToggle from "../toggles/UserTabToggle";
import UserInfo from "./UserInfo";
import { UserContext } from "@/app/context/userContext";
import LoaderCommunityUser from "../ui_elements/LoaderCommunityUser";
import { ViewContext } from "@/app/context/viewContext";
import UserPosts from "./content_components/UserPosts";
import UserFriends from "./content_components/UserFriends";


const ProfileLayout = ({ userID }: { userID: string }) => {
  const { currentUser } = useCurrentUser();
  const userContext = useContext(UserContext);
  const viewContext = useContext(ViewContext);

  const router = useRouter();

  const [profile, setProfile] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);
  const [isSame, setIsSame] = useState<boolean>();

  // In case the user changes the URL manually.
  const handleError = () => {
    router.push("/users");
  };

  useEffect(() => {
    // Initial profile loader.
    getProfile(userID, setProfile, handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, userContext]);

  useEffect(() => {
    if (profile) {
      setIsLoading(Object.keys(profile).length === 0);
      setIsSame(currentUser._id === profile._id);
    }
  }, [profile, currentUser]);

  return (
    <div className="flex flex-col font-ubuntu mb-10 w-full h-full min-h-screen max-w-4xl m-auto">
      {isLoading && <LoaderCommunityUser />}
      {!isLoading && (
        <>
          <UserInfo profile={profile} isSame={isSame} />
          <p className="text-secondary dark:text-gray-400 font-open md:hidden block px-4 break-words">
            {profile.bio}
          </p>
        </>
      )}
      <UserTabToggle />

      {viewContext.current === "feed" && (
        <UserPosts userID={profile._id} isSame={isSame} />
      )}
      {viewContext.current === "friends" && (
        <UserFriends userID={profile._id} isSame={isSame} />
      )}
    </div>
  );
};

export default ProfileLayout;
