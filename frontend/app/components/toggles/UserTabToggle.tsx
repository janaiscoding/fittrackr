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
    <div className="flex justify-evenly font-ubuntu-500 bg-bgContainers">
      <button
        className={`py-2 basis-full text-center hover:text-accent ${
          viewContext.current === "feed"
            ? "border-secondary text-accent border-b"
            : " text-secondary"
        }`}
        onClick={showFeed}
      >
        Feed
      </button>

      <button
        className={`py-2 basis-full text-center hover:text-accent ${
          viewContext.current === "friends"
            ? "border-secondary text-accent border-b"
            : "text-secondary"
        }`}
        onClick={showFriends}
      >
        Friends
      </button>
    </div>
  );
};

export default UserTabToggle;
