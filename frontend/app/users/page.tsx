/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BotNav from "../components/bottom_navbar/BotNav";
import TopNav from "../components/top_navbar/TopNav";
import useTokenVerification from "../hooks/useTokenVerification";
import Loader from "../assets/Loader";
// import UserComponent from "../components/users/User";
import useCommunityGetter from "../hooks/useCommunityGetter";

const Users = () => {
  useTokenVerification();
  const { isLoading, community } = useCommunityGetter();
  return (
    <div className="bg-black">
      <TopNav />
      <div className="min-h-[85vh] flex flex-col gap-2 p-4">
        <div className="text-2xl font-ubuntu-500 border-b-2 border-yellow2 mb-4 self-center">
          Our community
        </div>
        <div className=" grid auto-cols-fr auto-rows-min md:grid-cols-3 place-items-center">
          {isLoading && <Loader />}
          {/* {community.map((user, i) => (
            <UserComponent user={user} key={i} />
          ))} */}
        </div>
      </div>
      <BotNav />
    </div>
  );
};

export default Users;
