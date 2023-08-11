import Loader from "@/app/utils/assets/Loader";
import useCommunityGetter from "@/app/hooks/useCommunityGetter";
import UserWrapper from "./UserWrapper";

// mby dont add social buttons here
const NonFriendsUsers = () => {
  const { community, isLoading } = useCommunityGetter();

  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {!isLoading && community.length === 0 && (
        <p className="w-full self-center text-white2 bg-blue p-2 rounded">
          You are alone for now...
        </p>
      )}
      {community.map((user) => (
        <UserWrapper user={user} key={user._id} />
      ))}
    </div>
  );
};
export default NonFriendsUsers;
