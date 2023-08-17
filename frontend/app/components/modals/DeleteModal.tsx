import { SetStateAction } from "react";

const DeleteModal = ({
  handleDelete,
  setShowModal,
}: {
  handleDelete: () => void;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-bgContainers p-6 fixed z-[100] top-1/2 left-1/2 border border-softWhite shadow-md -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu rounded md:max-w-md">
      <p className="text-xl font-ubuntu-500 text-white mb-6 text-center">
        Are you sure you want to delete this?
      </p>
      <div className="flex gap-2 font-ubuntu-500 text-lg gap-2 justify-evenly">
        <button
          onClick={handleDelete}
          className="text-accent border border-outline hover:bg-accent hover:text-black border-solid py-1 px-3 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="text-error border border-outline hover:text-black hover:bg-error border-solid py-1 px-3 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
