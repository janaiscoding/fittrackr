/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "@/app/__types__/types";
import acceptRequest from "@/app/api/friends/accept_request";
import cancelRequest from "@/app/api/friends/cancel_request";
import declineRequest from "@/app/api/friends/decline_request";
import removeFriend from "@/app/api/friends/remove_friend";
import sendRequest from "@/app/api/friends/send_request";
import { UserContext } from "@/app/context/userContext";
import { JoinedDate } from "@/app/components/Date";
import ProfilePicture from "@/app/components/images/ProfilePicture";
import { useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import UploadSVG from "@/app/assets/svgs/Upload";
import getProfile from "@/app/api/users/get_profile";
import { getJwtToken } from "@/app/api/auth/auth_handler";
import useSocializer from "@/app/hooks/useSocializer";

const Info = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const {
    _id,
    first_name,
    last_name,
    bio,
    workouts,
    friends,
    requestsReceived,
    createdAt,
  } = profile;

  const userContext = useContext(UserContext);

  // If on user signed in page, we need to be able to observe the state changes for userContext
  const [avatar, setAvatar] = useState(profile.avatar);
  const [posts, setPosts] = useState(profile.posts);

  const [file, setFile] = useState<any>();
  const [uploadError, setUploadError] = useState(" ");

  const {
    isFriends,
    isPending,
    isReceived,
    handleAccept,
    handleDecline,
    handleAdd,
    handleRemove,
  } = useSocializer(profile);

  const handleEdit = () => {
    console.log("swapping to edit view");
  };

  useEffect(() => {
    // When profile changes occur(uploaded avatar or deleted posts), re-render the relevant components
    if (isSame && userContext.user) {
      setAvatar(userContext.user.avatar);
      setPosts(userContext.user.posts);
    }
  }, [userContext]);
  return (
    <div>
      <div className="flex justify-between items-start">
        <ProfilePicture avatar={avatar} />
        <Stats posts={posts} workouts={workouts} friends={friends} />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <div className=" flex gap-1 items-center text-green text-xl font-ubuntu-500">
            <p>
              {first_name} {last_name}
            </p>
            {isSame && (
              <label htmlFor="upload-avatar">
                <UploadSVG />
                <input
                  type="file"
                  name="myImage"
                  id="upload-avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files![0])}
                />
              </label>
            )}
          </div>
          <JoinedDate date={createdAt} />
        </div>
        <div>
          {isFriends && (
            <button className="social-button" onClick={handleRemove}>
              Remove
            </button>
          )}
          {isReceived && (
            <div>
              <button className="social-button" onClick={handleAccept}>
                Accept
              </button>{" "}
              <button className="social-button" onClick={handleDecline}>
                Decline
              </button>
            </div>
          )}
          {!isSame && !isReceived && !isFriends && (
            <button className="social-button" onClick={handleAdd}>
              {isPending ? "Cancel" : "Add"}
            </button>
          )}
          {isSame && (
            <button className="social-button" onClick={handleEdit}>
              Edit profile
            </button>
          )}
        </div>
      </div>
      <p> {bio}</p>
    </div>
  );
};

export default Info;
