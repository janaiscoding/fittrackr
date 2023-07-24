import { postsAPI } from "../endpoints";

const fetchPosts = async (token: string) => {
  console.log('fetch posts with', token)
  await fetch(postsAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("An error occured while fetching");
    });
};

export default fetchPosts;
