import Close from "@/app/utils/assets/svgs/Close";
import { SetStateAction } from "react";

const DeleteNotAllowed = ({
    setWarning,
}: {
    setWarning: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-full left-0 top-0 overflow-auto bg-gray-700/70 flex fixed z-[1000] justify-center items-center">
      <div className="bg-white p-6 fixed z-[100] w-full md:max-w-sm  top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu">
        <div className="flex justify-between">
          <p className="text-xl font-ubuntu-500 text-secondary text-center">
            Delete post
          </p>
          <div
            onClick={() => setWarning(false)}
            className="hover:bg-gray-700/10 rounded-full p-1 hover:cursor-pointer"
          >
            <Close />
          </div>
        </div>
        <p className="text-red-900 font-ubuntu-500 text-center py-2 my-2">
          Once deleted, this content cannot be recovered!
        </p>
        <div className="flex gap-2 font-ubuntu-500 text-lg gap-2 justify-between">
          <button
            onClick={() => setWarning(false)}
            className="text-secondary bg-gray-700/10 hover:text-black hover:bg-gray-700/20 border-solid py-1 px-3"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteNotAllowed;
