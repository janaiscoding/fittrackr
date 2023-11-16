const LoaderPost = () => {
  return (
    <div className="bg-bgContainers animate-loading w-full h-full shadow-md p-2">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full object-cover post-pic bg-gray-200/40"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-text w-40 h-3"></div>
            <div className="animate-text w-20 h-2"></div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 flex flex-col gap-2">
        <p className="animate-text w-full h-2 px-4"></p>
        <p className="animate-text w-full h-2 px-4"></p>
        <p className="animate-text w-full h-2 px-4"></p>
        <p className="animate-text w-[70%] h-2 px-4"></p>
      </div>
    </div>
  );
};

export default LoaderPost;
