import { useContext } from "react";
import { ViewContext } from "../../context/viewContext";

const TabToggle = () => {
  // Checks which tab is open on the homepage: Feet or Workouts.
  const viewContext = useContext(ViewContext);

  const showFeed = () => {
    viewContext.setCurrent("feed");
  };

  const showWorkouts = () => {
    viewContext.setCurrent("workouts");
  };
  return (
    <div className="flex justify-evenly text-xl font-ubuntu-500 bg-blue">
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 ${
          viewContext.current === "feed" && "border-b border-yellow2 bg-black/30"
        }`}
        onClick={showFeed}
      >
        Feed
      </button>
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 ${
          viewContext.current === "workouts" &&
          "border-b border-yellow2 bg-black/30"
        }`}
        onClick={showWorkouts}
      >
        Workouts
      </button>
    </div>
  );
};

export default TabToggle;
