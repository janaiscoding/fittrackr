import validator from "validator";

const unescapePost = (post: any) => {
  post.text = validator.unescape(post.text);
  post.comments.map((c: { comment: string }) => {
    c.comment = validator.unescape(c.comment);
    return c;
  });
};

export default unescapePost;
