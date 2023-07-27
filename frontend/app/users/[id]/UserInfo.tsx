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
import ProfilePicture from "@/app/ui_components/ProfilePicture";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import Stats from "./Stats";

const UserInfo = ({ profile }: { profile: User }) => {
  const {
    _id,
    first_name,
    last_name,
    bio,
    posts,
    workouts,
    birthday,
    friends,
    requestsReceived,
    createdAt,
  } = profile;

  const userContext = useContext(UserContext);

  const [isFriends, setIsFriends] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();
  const [isReceived, setIsReceived] = useState<boolean>();
  const [isSame, setIsSame] = useState<boolean>();

  const [file, setFile] = useState<any>();
  const [uploadError, setUploadError] = useState(" ");
  const [avatar, setAvatar] = useState(profile.avatar);
  const [isShown, setShown] = useState<boolean>(false);

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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
      await fetch(
        `https://fiturself.fly.dev/users/${userContext.user?._id}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getJwtToken()}`,
          },
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message && data.message.includes("success")) {
            getProfile(userContext.user!._id, userContext.setUser);
            setFile(undefined);
          } else {
            setUploadError(data);
            setFile(undefined);
          }
        })
        .then(() => {
          setFile(undefined);
          setShown(false);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (userContext.user && profile) {
      //means everything loaded so I can check the social status
      setIsFriends(friends.includes(userContext.user._id));
      setIsReceived(userContext.user?.requestsReceived?.includes(_id));
      setIsPending(requestsReceived.includes(userContext.user._id));
      setIsFriends(friends.includes(userContext.user!._id));
      setIsSame(_id === userContext.user._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext, profile]);
  useEffect(() => {
    if (userContext.user && isSame) {
      setAvatar(userContext.user!.avatar);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <AiOutlineCamera
              onClick={() => setShown(!isShown)}
              className="cursor-pointer"
            />
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
      {isShown && (
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <input
            type="file"
            name="myImage"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files![0]);
            }}
          />
          <button type="submit">Update Pic</button>
          {uploadError}
        </form>
      )}
    </div>
  );
};

export default UserInfo;
