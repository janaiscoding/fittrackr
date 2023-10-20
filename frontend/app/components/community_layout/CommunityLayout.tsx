import useCommunityGetter from "@/app/hooks/useCommunityGetter";
import Loader from "@/app/utils/assets/Loader";
import UserWrapper from "../socials_users/UserWrapper";

const CommunityLayout = () => {
  const { isLoading, community } = useCommunityGetter();

  return (
    <div className="w-full">
      <h1 className="text-xl text-secondary">Community</h1>
      <div className="flex flex-col md:grid md:grid-cols-3 md:gap-3 font-ubuntu gap-1">
        {isLoading && <Loader />}
        {!isLoading && community.length === 0 && (
          <p className="w-full self-center text-white2 bg-bgContainers p-2 rounded">
            You are alone for now...
          </p>
        )}
        {community.map((user, i) => (
          <div key={i}>
            <UserWrapper user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityLayout;
