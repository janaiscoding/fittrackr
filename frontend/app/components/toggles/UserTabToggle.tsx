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
    <div className="flex justify-start gap-6 px-4 font-ubuntu-500 border-b border-t">
      <button
        className={`py-2 text-center hover:text-accent ${
          viewContext.current === "feed"
            ? "border-secondary text-accent border-b"
            : " text-secondary"
        }`}
        onClick={showFeed}
      >
        Feed
      </button>

      <button
        className={`py-2 text-center hover:text-accent ${
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
