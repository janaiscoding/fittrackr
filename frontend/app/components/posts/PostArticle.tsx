/* eslint-disable react-hooks/exhaustive-deps */
import Author from "./Author";
import PostContent from "./PostContent";
import Comments from "../comments/Comments";
import { Post } from "@/app/utils/types";
import deletePost from "@/app/utils/api/posts/delete_post";
import getPosts from "@/app/utils/api/posts/get_posts";
import { PostsContext } from "@/app/context/postsContext";
import { useContext, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import DeleteModal from "../modals/DeleteModal";
import getProfile from "@/app/utils/api/users/get_profile";

const PostArticle = ({ post }: { post: Post }) => {
  const { _id, user, comments, createdAt } = post;

  const [showModal, setShowModal] = useState(false);
  const [isLoadingPosts, setIsLoading] = useState(true);

  const postsContext = useContext(PostsContext);
  const userContext = useContext(UserContext);

  const handleDelete = () => {
    deletePost(_id, handleSuccess);
  };

  const handleSuccess = () => {
    getPosts(postsContext.setPosts, () => {
      setIsLoading(false);
    });
    setShowModal(false);
    //@ts-ignore
    getProfile(userContext.user?._id, userContext.setUser);
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
