import {
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { getJwtToken } from "../../api/auth_handler";
import { UserContext } from "../../context/userContext";
import createPost from "../../api/create_post";
import SendSVG from "../../assets/svgs/SendSVG";
import { usePathname, useRouter } from "next/navigation";
import { postsAPI } from "../../api/endpoints";
import UploadSVG from "@/app/assets/svgs/Upload";

const FormPost = ({
  setShown,
}: {
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
      .then((data) => {
        if (data.errors) {
          setError(data.errors[0].msg);
          setSuccess(false);
        } else if (data === "Error: Please select an image.") {
          setError(data);
          setSuccess(false);
          setFile(undefined);
        } else {
          handleSuccess();
        }
      })
      .then(() => {
        setTimeout(() => {
          handleCancel();
          if (path !== "/" && path !== `/users/${userID}`) {
            router.push("/");
          }
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleSuccess = () => {
    setError(" ");
    setSuccess(true);
    setFile(undefined);
  };

  const clearData = () => {
    setFile(undefined);
    setError(" ");
    setSuccess(false);
  };

  const handleCancel = () => {
    setShown(false);
    clearData();
  };
  useEffect(() => {
    clearData();
  }, [setShown]);
  return (
    <div className="absolute bg-soft-black p-6 top-1/2 left-0">
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-2">Create a new post!</h1>
        <p onClick={handleCancel}>Cancel</p>
      </div>
      <form
        className=" flex items-center"
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
      >
        <label>
          <input
            type="text"
            className="w-full"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>
        <label htmlFor="upload-image">
          <UploadSVG />
          <input
            type="file"
            name="myImage"
            accept="image/*"
            id="upload-image"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files![0]);
            }}
          />
        </label>

        <button type="submit">
          <SendSVG />
        </button>
      </form>
      <p className="text-red">{error}</p>
      {success && <p className="text-green">Post sent</p>}
    </div>
  );
};

export default FormPost;
