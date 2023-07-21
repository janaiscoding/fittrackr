"use client";
import { useContext } from "react";
import { UserContext } from "../page";
import PostComponent from "../components/post_components/PostComponent";
import { Post } from "../utils/types/types";

const PostsHomepage = () => {
  const { posts } = useContext(UserContext);
  return (
    <div className="my-5">
      {posts.map((post: Post) => (
        <PostComponent post={post} key={post._id} />
      ))}
    </div>
  );
};

export default PostsHomepage;
