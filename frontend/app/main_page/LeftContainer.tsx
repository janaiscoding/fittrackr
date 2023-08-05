import Loader from "../assets/Loader";
import useCurrentUser from "../hooks/useCurrentUser";
import useLoadingUser from "../hooks/useLoadingUser";

const LeftContainer = () => {
  const isLoadingUser = useLoadingUser();
  const currentUser = useCurrentUser();

  return (
    <div className="hidden md:block">
      {isLoadingUser && <Loader />}
      <div>
        {currentUser.first_name} {currentUser.last_name}
      </div>
    </div>
  );
};

export default LeftContainer;
