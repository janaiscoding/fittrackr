// import Date from "./Date";
// import ProfilePicture from "../ProfilePicture";
// import { Avatar } from "@/app/__types__/types";
// import AvatarComment from "./AvatarComment";

// import { useContext, useState } from "react";
// import DeleteSVG from "../svgs/DeleteSVG";

// type CommentProps = {
//   avatar: Avatar;
//   commentatorID: string;
//   first: string;
//   last: string;
//   text: string;
//   date: string;
//   likes: number;
//   postID: string;
//   commID: string;
// };

// const CommComponent = ({
//   avatar,
//   commentatorID,
//   postID,
//   commID,
//   first,
//   last,
//   text,
//   date,
//   likes,
// }: CommentProps) => {
//   const [iLikes, setLikes] = useState(likes);
//   const [shown, setShown] = useState(false);
//   const { userID } = useContext(UserContext);
//   const commentAPI = `https://fiturself.fly.dev/posts/${postID}/${userID}/${commID}/like`;
//   // /posts/:postID/:userID/:commentID/like
//   const handleLike = async () => {
//     console.log("click like");
//     await fetch(commentAPI, {
//       method: "POST",
//       headers: {
//         authorization: `Bearer ${getJwtToken()}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setLikes(data.likes);
//       });
//   };
//   const handleDelete = async () => {
//     console.log("click delete");
//   };
//   return (
//     <div className="comment my-2 p-2">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-1">
//           <AvatarComment avatar={avatar} name={first} userID={userID} />
//           <div className="text-green font-bold tracking-wider">
//             {first} {last}{" "}
//             <div className="text-grey text-xs font-thin">
//               <Date date={date} />
//             </div>
//           </div>
//         </div>

//         {userID === commentatorID && (
//           <div onClick={() => setShown(true)}>
//             <DeleteSVG />
//           </div>
//         )}
//         {shown && <div>confirmation popup for delete</div>}
//       </div>
//       <div className="flex justify-between items-center mt-2">
//         <p className="ml-8 text-white">{text}</p>
//         <div onClick={handleLike} className="flex text-green">
//           <p>🔥</p>
//           <p>{iLikes}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommComponent;
