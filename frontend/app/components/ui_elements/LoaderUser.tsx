const LoaderUser = () => {
  return (
    <div className="bg-bgContainers animate-loading w-full h-full shadow-md flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-1 p-2">
        <div className="w-24 h-24 rounded-full sidebar-avatar-image bg-gray-200/10"></div>
        <div className="animate-text w-32 h-4"></div>
      </div>
      <div className="w-full h-16 bg-gray-600/10 flex items-center justify-center">
        <div className="animate-text w-4/5 h-2 m-4"></div>
      </div>
    </div>
  );
};

export default LoaderUser;
