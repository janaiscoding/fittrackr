import { useState } from "react";

const useViewSetter = () => {
  const [view, setView] = useState("feed");
  const viewContext = useContext(ViewContext);
  const showFeed = () => {
    viewContext.setViewWorkouts(false);
    viewContext.setViewFeed(true);
  };

  const showWorkouts = () => {
    viewContext.setViewWorkouts(true);
    viewContext.setViewFeed(false);
  };
  return view;
};
