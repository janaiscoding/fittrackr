import { SyntheticEvent, useContext, useState } from "react";
import { getJwtToken } from "../api/auth_handler";
import { UserContext } from "../context/userContext";
import axios from "axios";

const FormPost = () => {
  const [text, setText] = useState("");
  const userContext = useContext(UserContext);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(text, userContext.user?._id, getJwtToken());

    axios
      .post(`https://fiturself.fly.dev/posts/${userContext.user?._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        body: JSON.stringify(text),
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <form className="p-6" onSubmit={(e) => handleSubmit(e)}>
      <label className="flex flex-col">
        <span className="self-start text-green">Create a new post..</span>
        <input
          required
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          type="submit"
          className="text-2xl text-center text-black bg-green rounded-2xl font-medium py-2 mt-6 w-full"
        >
          Send
        </button>
      </label>
    </form>
  );
};

export default FormPost;
