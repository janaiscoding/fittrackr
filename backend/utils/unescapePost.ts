import validator from "validator";

const unescapePost = (post: any) => {
  post.description = validator.unescape(post.description);
  post.comments.map((c: { comment: string }) => {
    c.comment = validator.unescape(c.comment);
    return c;
  });
};

export default unescapePost;
