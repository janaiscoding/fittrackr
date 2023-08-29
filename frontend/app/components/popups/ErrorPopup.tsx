const ErrorPopup = ({ message }: { message: string }) => {
  return (
    <div className="bg-bgContainers border border-error p-6 fixed z-[100] w-full top-1/4 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[95%] md:w-[20%] font-ubuntu rounded">
      <p className="text-error">{message}</p>
    </div>
  );
};

export default ErrorPopup;
