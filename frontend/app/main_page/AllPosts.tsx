import axios from "axios";
import { Post } from "../__types__/types";
import { getJwtToken } from "../api/auth_handler";
import { useEffect, useState } from "react";
import PostComponent from "./PostComponent";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios
      .get(`https://fiturself.fly.dev/posts`, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>All posts:</h1>
      {posts.map((post, i) => (
        <PostComponent key={i} post={post} />
      ))}
    </div>
  );
};

export default Posts;
