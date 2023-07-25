import { SyntheticEvent, useContext, useState } from "react";
import { getJwtToken } from "../api/auth_handler";
import { UserContext } from "../context/userContext";
import createPost from "../api/createPost";
import SendSVG from "../assets/svgs/SendSVG";

const FormPost = () => {
  const [text, setText] = useState("");
  const userContext = useContext(UserContext);
  const createPostAPI = `https://fiturself.fly.dev/posts/${userContext.user?._id}`;
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createPost(createPostAPI, text);
  };
  return (
    <form className="bg-soft-black p-5" onSubmit={(e) => handleSubmit(e)}>
      <label>
        <span className="self-start text-green">Create a new post..</span>
        <input
          required
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </label>
      <button type="submit">
        <SendSVG />
      </button>
    </form>
  );
};

export default FormPost;
