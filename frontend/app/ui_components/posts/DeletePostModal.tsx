import { SetStateAction } from "react";

type DeleteModalProps = {
  handleDelete: () => void;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const DeletePostModal = ({ handleDelete, setOpen }: DeleteModalProps) => {
  return (
    <div className="absolute top-50 left-50 bg-black text-green flex flex-col">
      <p> Are you sure you want to delete this?</p>
      <div className="flex gap-2">
        <button onClick={handleDelete}>yes</button>
        <button onClick={() => setOpen(false)} className="text-red">
          cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
