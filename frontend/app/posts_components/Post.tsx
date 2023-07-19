const Post = ({ post }: any) => {
  return (
    <article>
      <h1> {post.text}</h1>
      {/* <ProfilePicture userData={post.user} /> */}
    </article>
  );
};
export default Post;
