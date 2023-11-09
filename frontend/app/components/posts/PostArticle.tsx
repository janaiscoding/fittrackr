/* eslint-disable react-hooks/exhaustive-deps */
import Author from "./Author";
import PostContent from "./PostContent";
import Comments from "../comments/Comments";
import { Post } from "@/app/utils/types";
import deletePost from "@/app/utils/api/posts/delete_post";
import { PostsContext } from "@/app/context/postsContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import DeletePostModal from "../modals/DeletePostModal";
import getPostsSetter from "@/app/utils/api/posts/posts_setter";
import UpdateDescriptionForm from "../modals/EditPostModal";

const PostArticle = ({ post }: { post: Post }) => {
  const { _id, user, comments, createdAt } = post;

  const [isAuthor, setIsAuthor] = useState<boolean>();

  // Interacting with delete and edit happens on author sub-component where we know if the user author is the logged in user
  const [showDelModal, setShowDelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const postsContext = useContext(PostsContext);
  const userContext = useContext(UserContext);

  const handleDelete = () => {
    const handleSuccessDel = () => {
      setShowDelModal(false);
      getPostsSetter(postsContext.setPosts);
    };
    deletePost(_id, handleSuccessDel);
  };

  useEffect(() => {
    if (userContext.user) {
      setIsAuthor(user._id === userContext.user._id);
    }
  }, [userContext.user, postsContext.posts]);

  return (
    <article className="bg-bgContainers shadow-md py-2">
      <Author
        setShowDelModal={setShowDelModal}
        setShowEditModal={setShowEditModal}
        author={user}
        createdAt={createdAt}
        isAuthor={isAuthor}
      />
      <PostContent post={post} />
      <Comments postID={_id} postComments={comments} />
      {showDelModal && (
        <DeletePostModal
          handleDelete={handleDelete}
          setShowDelModal={setShowDelModal}
        />
      )}
      {showEditModal && <UpdateDescriptionForm post={post} setShowEditModal={setShowEditModal}/>}
    </article>
  );
};

export default PostArticle;
