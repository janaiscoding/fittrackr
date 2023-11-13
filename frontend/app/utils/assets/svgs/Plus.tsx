const Plus = () => {
  return (
    <div className="block relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#3F72AF"
        height="3em"
        viewBox="0 0 512 512"
        className="py-0  z-50"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      </svg>
      <div className="h-[2em] w-[2em] rounded-full bg-bgContainers dark:bg-gray-800 absolute -translate-y-1/2 z-[-50] top-[50%]"></div>
    </div>
  );
};

export default Plus;
