import validator from "validator";

const unescapeUser = (user: {
  first_name: string;
  last_name: string;
  bio: string;
}) => {
  user.first_name = validator.unescape(user.first_name);
  user.last_name = validator.unescape(user.last_name);
  user.bio = validator.unescape(user.bio);
  return user;
};

export default unescapeUser;
