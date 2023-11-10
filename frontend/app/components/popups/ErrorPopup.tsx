const ErrorPopup = ({
  message,
  cancelError,
}: {
  message: string;
  cancelError: () => void;
}) => {
  return (
    <div className="w-full h-full left-0 top-0 overflow-auto bg-gray-700/70 flex fixed z-[1000] justify-center items-center">
      <div className="bg-bgContainers flex flex-col justify-center items-center gap-4 shadow-md p-6 fixed z-[100] w-full top-1/4 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[95%] md:w-1/2 font-ubuntu">
        <p className="text-xl font-ubuntu-500 text-secondary text-center">
          Upload Error
        </p>
        <p className="text-error text-center font-bold">{message}</p>
        <button
          className="text-secondary bg-gray-700/10 hover:text-black hover:bg-gray-700/20 border-solid py-1 px-3"
          aria-label="Click to close upload error popup"
          onClick={() => cancelError()}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
