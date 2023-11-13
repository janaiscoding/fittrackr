import { EditContext } from "@/app/context/editContext";
import { useContext } from "react";

const EditButton = () => {
  const editContext = useContext(EditContext);
  return (
    <button
      onClick={() => editContext.setShowEdit(true)}
      className="md:text-xl text-secondary dark:text-white dark:bg-gray-800 dark:hover:bg-gray-900 hover:text-accent bg-slate-700/20 hover:bg-slate-700/10 p-2"
    >
      Customize
    </button>
  );
};
export default EditButton;
