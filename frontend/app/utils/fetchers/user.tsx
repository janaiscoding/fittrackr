const fetchUser = async (
  token: string,
  id: string,
  setUserData: React.Dispatch<any[]> // fix posts types
) => {
  await fetch(`https://fiturself.fly.dev/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUserData(data.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default fetchUser;
