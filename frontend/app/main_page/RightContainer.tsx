import Loader from "../assets/Loader";
import useLoadingUser from "../hooks/useLoadingUser";

const RightContainer = () => {
  const isLoadingUser = useLoadingUser();
  // will be replaced with whatever content
  return <div className="hidden md:block">{isLoadingUser && <Loader />}</div>;
};

export default RightContainer;
