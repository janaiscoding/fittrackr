/* eslint-disable react-hooks/exhaustive-deps */
import Author from "./Author";
import PostContent from "./PostContent";
import Comments from "../comments/Comments";
import { Post } from "@/app/utils/types";
import deletePost from "@/app/utils/api/posts/delete_post";
import { PostsContext } from "@/app/context/postsContext";
import { useContext, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import DeleteModal from "../modals/DeleteModal";
import getPostsSetter from "@/app/utils/api/posts/posts_setter";

const PostArticle = ({ post }: { post: Post }) => {
  const { _id, user, comments, createdAt } = post;

  const [showModal, setShowModal] = useState(false);
  const postsContext = useContext(PostsContext);

  const handleDelete = () => {
    deletePost(_id, handleSuccess);
  };

  const handleSuccess = () => {
    // getPosts(postsContext.setPosts, () => {
    //   //console.log("fresh batch");
    // });
    setShowModal(false);
    // //@ts-ignore
    // getProfile(userContext.user?._id, userContext.setUser);
    getPostsSetter(postsContext.setPosts);
  };

  return (
    <article className="bg-bgContainers shadow-md py-2">
      <Author setShowModal={setShowModal} author={user} createdAt={createdAt} />
      <PostContent post={post} />
      <Comments postID={_id} postComments={comments} />
      {showModal && (
        <DeleteModal handleDelete={handleDelete} setShowModal={setShowModal} />
      )}
    </article>
  );
};

export default PostArticle;
