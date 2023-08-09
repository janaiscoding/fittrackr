// import { useContext, useEffect, useState } from "react";
// import { CommunityUser } from "../../__types__/types";
// import { UserContext } from "../../context/userContext";
// import removeFriend from "../../api/friends/remove_friend";
// import cancelRequest from "../../api/friends/cancel_request";
// import sendRequest from "../../api/friends/send_request";
// import acceptRequest from "../../api/friends/accept_request";
// import declineRequest from "../../api/friends/decline_request";
// import AvatarPost from "../images/AvatarPost";
// import useCurrentUser from "@/app/hooks/useCurrentUser";
// import AvatarCommunity from "../images/AvatarCommunity";

// const UserComponent = ({ user }: { user: CommunityUser }) => {
//   const { _id, first_name, last_name, avatar, posts, workouts, friends } = user;
//   const currentUser = useCurrentUser();
//   const [isFriends, setIsFriends] = useState<boolean>();
//   const [isPending, setIsPending] = useState<boolean>();
//   const [isReceived, setIsReceived] = useState<boolean>();

//   const handleAdd = () => {
//     if (isPending) {
//       cancelRequest(_id, currentUser._id).then(() => setIsPending(false));
//     } else {
//       sendRequest(_id, currentUser._id).then(() => setIsPending(true));
//     }
//   };
//   const handleAccept = () => {
//     acceptRequest(_id, currentUser._id).then(() => {
//       setIsReceived(false);
//       setIsPending(false);
//       setIsFriends(true);
//     });
//   };
//   const handleDecline = () => {
//     declineRequest(_id, currentUser._id).then(() => {
//       setIsReceived(false);
//       setIsPending(false);
//       setIsFriends(false);
//     });
//   };
//   const handleRemove = () => {
//     removeFriend(_id, currentUser._id).then(() => setIsFriends(false));
//   };

//   useEffect(() => {
//     // Establish the friendship status between currentUser and each community user.
//     if (currentUser._id) {
//       setIsFriends(user.friends.includes(currentUser._id));
//       setIsReceived(currentUser.requestsReceived?.includes(user._id));
//       setIsPending(user.requestsReceived.includes(currentUser._id));
//       setIsFriends(user.friends.includes(currentUser._id));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentUser]);
//   return (
//     <div className="w-5/6 border border-yellow2 rounded p-4 mb-2">
//       <div className="flex justify-between">
//         <div className="flex items-center gap-1">
//           <AvatarCommunity avatar={avatar} userID={_id} />
//           <div className="flex flex-col gap-1">
//             <a href={`/users/${_id}`} className="text-white hover:text-yellow">
//               {first_name} {last_name}
//             </a>
//           </div>
//         </div>
//         <div>
//           {isFriends && (
//             <button
//               className="flex gap-1 items-center justify-between border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
//               onClick={handleRemove}
//             >
//               Remove
//             </button>
//           )}
//           {isReceived && (
//             <div>
//               <button
//                 className="flex gap-1 items-center justify-between border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
//                 onClick={handleAccept}
//               >
//                 Accept
//               </button>{" "}
//               <button
//                 className="flex gap-1 items-center justify-between border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
//                 onClick={handleDecline}
//               >
//                 Decline
//               </button>
//             </div>
//           )}
//           {!isReceived && !isFriends && (
//             <button
//               className="flex gap-1 items-center justify-between border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
//               onClick={handleAdd}
//             >
//               {isPending ? "Cancel" : "Add"}
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="flex text-xs text-white2 gap-2 ml-12">
//         <p>{posts.length} posts </p>
//         <p>{workouts.length} workouts </p>
//         <p>{friends.length} friends</p>
//       </div>
//     </div>
//   );
// };

// export default UserComponent;
