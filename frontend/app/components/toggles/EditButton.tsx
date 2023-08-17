import { EditContext } from "@/app/context/editContext";
import { useContext } from "react";

const EditButton = () => {
    const editContext = useContext(EditContext)
  return (
    <button
      onClick={() => editContext.setShowEdit(true)}
      className="text-sm text-white border border-softWhite hover:border-accent hover:bg-black border-solid py-1 px-3 rounded-md"
    >
      Edit profile
    </button>
  );
};
export default EditButton