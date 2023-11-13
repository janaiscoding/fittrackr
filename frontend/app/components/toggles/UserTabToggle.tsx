import { useContext } from "react";
import { ViewContext } from "../../context/viewContext";

const UserTabToggle = () => {
  // Checks which tab is open on the homepage: Feet or Workouts.
  const viewContext = useContext(ViewContext);
  
  const showFeed = () => {
    viewContext.setCurrent("feed");
  };

  const showFriends = () => {
    viewContext.setCurrent("friends");
  };
  return (
    <div className="flex justify-center gap-6 px-4 font-ubuntu-500 border-b border-t dark:border-gray-600">
      <button
        className={`py-2 text-center text-lg hover:text-accent ${
          viewContext.current === "feed"
            ? "border-secondary dark:text-white text-accent  border-b border-t dark:border-gray-600"
            : " text-secondary dark:text-gray-300"
        }`}
        onClick={showFeed}
      >
        Feed
      </button>

      <button
        className={`py-2 text-center text-lg hover:text-accent ${
          viewContext.current === "friends"
            ? "border-secondary dark:text-white text-accent  border-b border-t dark:border-gray-600"
            : "text-secondary dark:text-gray-300"
        }`}
        onClick={showFriends}
      >
        Friends
      </button>
    </div>
  );
};

export default UserTabToggle;
