import { EditContext } from "@/app/context/editContext";
import { useContext } from "react";

const EditButton = () => {
    const editContext = useContext(EditContext)
  return (
    <button
      onClick={() => editContext.setShowEdit(true)}
      className="md:text-xl text-secondary hover:text-accent hover:bg-slate-700/10 px-2"
    >
      Edit profile
    </button>
  );
};
export default EditButton