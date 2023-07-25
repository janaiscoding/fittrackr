import { SetStateAction } from "react";
import { postsAPI } from "../endpoints";
import { Post } from "@/app/__types__/types";

const fetchPosts = async (
  token: string,
  setPosts: React.Dispatch<SetStateAction<[] | Post[]>>
) => {
  await fetch(postsAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("SetPosts to display on main page", data.posts);
      setPosts(data.posts);
    })
    .catch((err) => {
      console.log("An error occured while fetching");
    });
};

export default fetchPosts;
