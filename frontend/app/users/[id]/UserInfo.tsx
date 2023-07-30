/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "@/app/__types__/types";
import { getJwtToken } from "@/app/api/auth_handler";
import acceptRequest from "@/app/api/friends/accept_request";
import cancelRequest from "@/app/api/friends/cancel_request";
import declineRequest from "@/app/api/friends/decline_request";
import removeFriend from "@/app/api/friends/remove_friend";
import sendRequest from "@/app/api/friends/send_request";
import getProfile from "@/app/api/get_profile";
import { UserContext } from "@/app/context/userContext";
import { JoinedDate } from "@/app/ui_components/Date";
import ProfilePicture from "@/app/ui_components/images/ProfilePicture";
import { useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import UploadSVG from "@/app/assets/svgs/Upload";

const UserInfo = ({ profile }: { profile: User }) => {
  const {
    _id,
    first_name,
    last_name,
    bio,
    posts,
    workouts,
    friends,
    requestsReceived,
    createdAt,
  } = profile;

  const userContext = useContext(UserContext);
  const [isSame, setIsSame] = useState<boolean>();
  const [avatar, setAvatar] = useState(profile.avatar);

  const [isFriends, setIsFriends] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();
  const [isReceived, setIsReceived] = useState<boolean>();

  const [file, setFile] = useState<any>();
  const [uploadError, setUploadError] = useState(" ");

  const handleAdd = () => {
    if (isPending) {
      cancelRequest(_id, userContext.user?._id).then(() => setIsPending(false));
    } else {
      sendRequest(_id, userContext.user?._id).then(() => setIsPending(true));
    }
  };
  const handleAccept = () => {
    acceptRequest(_id, userContext.user?._id).then(() => {
      setIsReceived(false);
      setIsPending(false);
      setIsFriends(true);
    });
  };

  const handleDecline = () => {
    declineRequest(_id, userContext.user?._id).then(() => {
      setIsReceived(false);
      setIsPending(false);
      setIsFriends(false);
    });
  };

  const handleRemove = () => {
    removeFriend(_id, userContext.user?._id).then(() => setIsFriends(false));
  };

  useEffect(() => {
    const formData = new FormData();
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
      fetch(`https://fiturself.fly.dev/users/${userContext.user?._id}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          data.message
            ? getProfile(userContext.user?._id, userContext.setUser)
            : setUploadError(data);
        })
        .then(() => {
          setFile(undefined);
        })
        .catch((err) => console.log(err));
    }
  }, [file]);

  useEffect(() => {
    if (userContext.user && profile) {
      //all loaded: Check the social status and same profile
      setIsFriends(friends.includes(userContext.user._id));
      setIsReceived(userContext.user?.requestsReceived?.includes(_id));
      setIsPending(requestsReceived.includes(userContext.user._id));
      setIsFriends(friends.includes(userContext.user!._id));
      setIsSame(_id === userContext.user._id);
    }
  }, [userContext, profile]);

  useEffect(() => {
    if (isSame && userContext.user) {
      setAvatar(userContext.user.avatar);
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
          {isSame && <button className="social-button">Edit profile</button>}
        </div>
      </div>
      <p> {bio}</p>
    </div>
  );
};

export default UserInfo;
