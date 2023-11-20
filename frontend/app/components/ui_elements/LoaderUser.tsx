const LoaderUser = () => {
  return (
    <div className="bg-bgContainers animate-loading w-full h-full shadow-md flex flex-col items-center justify-center">
      <div className="flex items-center gap-1 p-2">
        <div className="w-20 h-20 rounded-full post-pic bg-gray-200/10"></div>
        <div className="animate-text w-28 h-4"></div>
      </div>
      <div className="w-full h-10 bg-gray-600/10 flex items-center justify-center">
        <div className="animate-text w-3/4 h-2 m-4"></div>
      </div>
    </div>
  );
};

export default LoaderUser;
