import useCommunityGetter from "@/app/hooks/useCommunityGetter";
import Loader from "@/app/utils/assets/Loader";
import UserWrapper from "../socials_users/UserWrapper";
import SocializeButtons from "../socials_users/SocializeButtons";

const CommunityLayout = () => {
  const { isLoading, community } = useCommunityGetter();

  return (
    <div className="flex flex-col font-ubuntu mb-10 w-full gap-1">
      <div className="text-2xl font-ubuntu-500 border-b-2 border-secondary mb-4 self-center">
        Users ;3
      </div>
      {isLoading && <Loader />}
      {!isLoading && community.length === 0 && (
        <p className="w-full self-center text-white2 bg-bgContainers p-2 rounded">
          You are alone for now...
        </p>
      )}
      {community.map((user, i) => (
        <div key={i}>
          <UserWrapper user={user} />
          <SocializeButtons user={user} />
        </div>
      ))}
    </div>
  );
};

export default CommunityLayout;
