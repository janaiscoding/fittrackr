/* eslint-disable react-hooks/exhaustive-deps */
import { PostsContext } from "../../../context/postsContext";
import { useContext, useEffect } from "react";
import getPosts from "../../../utils/api/posts/get_posts";

import { ViewContext } from "../../../context/viewContext";
import FeedView from "./FeedView";
import TabToggle from "./TabToggle";

const AppData = () => {
  // Checks which tab is open on the homepage: Feed or Workouts.
  const viewContext = useContext(ViewContext);

  // Fetch posts on load
  const postsContext = useContext(PostsContext);
  useEffect(() => {
    getPosts(postsContext.setPosts);
    // Don't need to fetch all over again, that happens on the mapping process. This is just initial setter for the context. Happens on every page.
  }, []);

  return (
    <div className="flex flex-col font-ubuntu mb-10 w-full ">
      <TabToggle />
      {viewContext.current === "feed" && <FeedView />}
      {viewContext.current === "workouts" && <p>Work in progress.</p>}
    </div>
  );
};

export default AppData;
