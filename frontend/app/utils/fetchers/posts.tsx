import { postsAPI } from "../api/endpoints";

const fetchPosts = async (
  token: string,
  setPostsData: React.Dispatch<any[]> // fix posts types
) => {
  await fetch(postsAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setPostsData(data.posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default fetchPosts;
