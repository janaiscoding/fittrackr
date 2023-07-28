import { SetStateAction, SyntheticEvent, useContext, useState } from "react";
import { getJwtToken } from "../api/auth_handler";
import { UserContext } from "../context/userContext";
import createPost from "../api/create_post";
import SendSVG from "../assets/svgs/SendSVG";
import { usePathname, useRouter } from "next/navigation";

const FormPost = ({
  setShown,
}: {
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const path = usePathname();
  const userContext = useContext(UserContext);
  const userID = userContext.user!._id;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (text.length > 0) {
      createPost(text, userID).then(() => {
        setShown(false);
        // Only close form AFTER post logic is finished
      });
      if (path !== "/" && path !== `/users/${userID}`) {
        router.push("/");
      }
      setError("");
    } else {
      setError("Post is too short.");
    }
  };
  return (
    <form
      className="bg-soft-black p-5 absolute top-1/2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label>
        <span className="self-start text-green">Create a new post..</span>
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </label>
      <button type="submit">
        <SendSVG />
      </button>
      <p className="text-red">{error}</p>
    </form>
  );
};

export default FormPost;
