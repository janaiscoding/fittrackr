import axios from "axios";
import { Post } from "../__types__/types";
import { getJwtToken } from "../api/auth_handler";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    console.log("fetchin");
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
      {posts.map((p) => (
        <p key={p._id}>{p.text}</p>
      ))}
    </div>
  );
};

export default Posts;
