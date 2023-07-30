import { SetStateAction, SyntheticEvent, useContext, useState } from "react";
import { getJwtToken } from "../../api/auth_handler";
import { UserContext } from "../../context/userContext";
import createPost from "../../api/create_post";
import SendSVG from "../../assets/svgs/SendSVG";
import { usePathname, useRouter } from "next/navigation";
import { postsAPI } from "../../api/endpoints";

const FormPost = ({
  setShown,
}: {
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState<any>(undefined);

  const router = useRouter();
  const path = usePathname();
  const userContext = useContext(UserContext);
  const userID = userContext.user!._id;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    //if file
    const formData = new FormData();
    formData.append("text", text);
    formData.append("userID", userID);
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
    }
    fetch(postsAPI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    //   createPost(text, formData, userID).then(() => {
    //     setShown(false);
    //     setFile(undefined)
    //   });
    //   if (path !== "/" && path !== `/users/${userID}`) {
    //     router.push("/");
    //   }
    //   setError("");
    // } else {
    //   setFile(undefined)
    //   setError("Post is too short.");
  };
  return (
    <form
      className="bg-soft-black p-5 absolute top-50"
      onSubmit={(e) => handleSubmit(e)}
      encType="multipart/form-data"
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
      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
      />
      <button type="submit">
        <SendSVG />
      </button>
      <p className="text-red">{error}</p>
    </form>
  );
};

export default FormPost;
