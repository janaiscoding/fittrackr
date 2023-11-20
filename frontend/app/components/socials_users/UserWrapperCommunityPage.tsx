import { User } from "@/app/utils/types";
import SocializeButtons from "./SocializeButtons";
import UserWrapperWithBannerAndPosts from "./UserWrapperWithBannerAndPosts";


const UserWrapperCommunityPage = ({ user }: { user: User }) => {
  return (
    <div
      key={user._id}
      className="bg-bgContainers dark:bg-gray-800 text-secondary dark:text-gray-300 pb-2 flex flex-col items-center justify-between gap-2 drop-shadow text-sm"
    >
      <UserWrapperWithBannerAndPosts currentUser={user} />
      <SocializeButtons user={user} />
    </div>
  );
};

export default UserWrapperCommunityPage;
