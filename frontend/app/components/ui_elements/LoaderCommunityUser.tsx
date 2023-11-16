const LoaderCommunityUser = () => {
  return (
    <div className="bg-bgContainers animate-loading w-full h-full shadow-md flex flex-col items-center justify-center">
      <div className="flex items-center gap-1 p-2">
        <div className="w-12 h-12 rounded-full avatar-image bg-gray-200/10"></div>
        <div className="flex flex-col gap-1">
          <div className="animate-text w-32 h-4"></div>
          <div className="flex gap-1">
            <div className="animate-text w-20 h-2"></div>
            <div className="animate-text w-20 h-2"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-8 bg-gray-600/10 flex items-center justify-center">
        <div className="animate-text w-20 h-6 m-4"></div>
      </div>
    </div>
  );
};

export default LoaderCommunityUser;
