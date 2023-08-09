import { ModalContext } from "@/app/context/modalContext";
import { SetStateAction, useContext } from "react";

const DeletePostModal = ({
  handleDelete,
  setShowModal,
}: {
  handleDelete: () => void;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-black p-6 fixed z-[100] top-1/2 left-1/2 shadow-md -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu rounded md:max-w-md">
      <p className="text-xl font-ubuntu-500 text-white2 mb-6 text-center">
        {" "}
        Are you sure you want to delete this post?
      </p>
      <div className="flex gap-2 font-ubuntu-500 text-lg gap-2 justify-evenly">
        <button
          onClick={handleDelete}
          className="text-valid border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="text-error border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
