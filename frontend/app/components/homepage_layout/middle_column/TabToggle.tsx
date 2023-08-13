import { useContext } from "react";
import { ViewContext } from "../../../context/viewContext";

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
    <div className="flex justify-evenly font-ubuntu-500 bg-bgContainers">
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 border-b ${
          viewContext.current === "feed"
            ? "border-secondary bg-black/30 text-white text-xl"
            : "border-white/30 text-white2 text-lg"
        }`}
        onClick={showFeed}
      >
        Feed
      </button>
      <button
        className={`py-2 basis-full text-center hover:bg-black/30 border-b ${
          viewContext.current === "workouts"
            ? "border-secondary bg-black/30 text-white text-xl"
            : "border-white/30 text-white2 text-lg"
        }`}
        onClick={showWorkouts}
      >
        Workouts
      </button>
    </div>
  );
};

export default TabToggle;
