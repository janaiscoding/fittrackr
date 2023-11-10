import Close from "@/app/utils/assets/svgs/Close";
import { SetStateAction } from "react";

const DeleteNotAllowed = ({
  setWarning,
}: {
  setWarning: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-full left-0 top-0 overflow-auto bg-gray-700/90 flex fixed z-[1000] justify-center items-center">
      <div className="bg-white p-6 fixed z-[100] w-full md:max-w-sm  top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu">
        <p className="text-red-900 font-ubuntu-500 text-center py-2 my-2">
          Oops. You can&apos;t delete the demo account!
        </p>
        <div className="flex gap-2 font-ubuntu-500 text-lg gap-2 justify-center">
          <button
            onClick={() => setWarning(false)}
            className="text-secondary bg-gray-700/10 hover:text-black hover:bg-gray-700/20 border-solid py-1 px-3"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotAllowed;
