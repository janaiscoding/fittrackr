const ErrorPopup = ({ message }: { message: string }) => {
  return (
    <div className="bg-bgContainers shadow-md p-6 fixed z-[100] w-full top-1/4 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[95%] md:w-1/2 font-ubuntu">
      <p className="text-xl text-error text-center font-bold">{message}</p>
    </div>
  );
};

export default ErrorPopup;
