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

const Info = ({ profile }: { profile: User }) => {
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
  // Determines if the user page is the currently signed in user
  const [isSame, setIsSame] = useState<boolean>();
  // If on user signed in page, we need to be able to observe the state changes for userContext
  const [avatar, setAvatar] = useState(profile.avatar);
  const [posts, setPosts] = useState(profile.posts);

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
  const handleEdit = () => {
    console.log("swapping to edit view");
  };
  useEffect(() => {
    if (userContext.user && profile) {
      //Determines the relation between userContext and fetched profile
      setIsFriends(friends.includes(userContext.user._id));
      setIsReceived(userContext.user?.requestsReceived?.includes(_id));
      setIsPending(requestsReceived.includes(userContext.user._id));
      setIsFriends(friends.includes(userContext.user!._id));
      // Or if the logged in user is the one on the page
      setIsSame(_id === userContext.user._id);
    }
  }, [userContext, profile]);

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
