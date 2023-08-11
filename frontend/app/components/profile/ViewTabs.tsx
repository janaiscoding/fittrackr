import { useContext } from "react";
import { ViewContext } from "../../context/viewContext";

const ViewTabs = () => {
  // Checks which tab is open on the homepage: Feet or Workouts.
  const viewContext = useContext(ViewContext);

  const showFeed = () => {
    viewContext.setCurrent("feed");
  };

  const showWorkouts = () => {
    viewContext.setCurrent("workouts");
  };
  const showFriends = () => {
    viewContext.setCurrent("friends");
  };
  return (
    <div className="flex justify-evenly font-ubuntu-500 bg-blue">
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 border-b ${
          viewContext.current === "feed"
            ? "border-yellow2 bg-black/30 text-white text-xl"
            : "border-white/30 text-white2 text-lg"
        }`}
        onClick={showFeed}
      >
        Feed
      </button>
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 border-b ${
          viewContext.current === "workouts"
            ? "border-yellow2 bg-black/30 text-white text-xl"
            : "border-white/30 text-white2 text-lg"
        }`}
        onClick={showWorkouts}
      >
        Workouts
      </button>
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 border-b ${
          viewContext.current === "friends"
            ? "border-yellow2 bg-black/30 text-white text-xl"
            : "border-white/30 text-white2 text-lg"
        }`}
        onClick={showFriends}
      >
        Friends
      </button>
    </div>
  );
};

export default ViewTabs;
