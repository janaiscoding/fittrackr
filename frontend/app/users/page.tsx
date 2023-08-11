/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BotNav from "../components/bottom_navbar/BotNav";
import TopNav from "../components/top_navbar/TopNav";
import useTokenVerification from "../hooks/useTokenVerification";
import Loader from "../utils/assets/Loader";
import useCommunityGetter from "../hooks/useCommunityGetter";
import Social from "../components/homepage_layout/right_column/Social";
import Sidebar from "../components/homepage_layout/left_column/Sidebar";
import UserWrapper from "../components/socials_users/UserWrapper";
import SocializeButtons from "../components/socials_users/SocializeButtons";

const Users = () => {
  useTokenVerification();
  const { isLoading, community } = useCommunityGetter();

  return (
    <div className="bg-black margin-auto">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <Sidebar />
        <div className="flex flex-col font-ubuntu mb-10 w-full gap-1">
          <div className="text-2xl font-ubuntu-500 border-b-2 border-yellow2 mb-4 self-center">
            Users ;3
          </div>
          {isLoading && <Loader />}
          {!isLoading && community.length === 0 && (
            <p className="w-full self-center text-white2 bg-blue p-2 rounded">
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
        <Social />
      </div>
      <BotNav />
    </div>
  );
};

export default Users;
