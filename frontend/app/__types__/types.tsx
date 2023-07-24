type Avatar = {
  contentType: string;
  data: Buffer;
};

type User = {
  _id: String;
  first_name: String;
  last_name: String;
  birthday: String;
  avatar: Avatar | undefined;
  workouts: Workout[];
  posts: Post[];
  friends: string[];
  requestsSent: string[];
  requestsReceived: string[];
  createdAt: String;
  updatedAt: String;
};
//todo
type Workout = {
  _id: String;
};
type CommunityUser = {
  // community, friends, friend req sent/received
  //all users - only displays name, pic and numbered stats of posts workouts and friends
  _id: String;
  first_name: String;
  last_name: String;
  avatar: Avatar | undefined;
  posts: string[];
  workouts: string[];
  friends: string[];
};
type CommentUser = {
  //on any post!
  _id: String;
  first_name: String;
  last_name: String;
  avatar: Avatar | undefined;
};

type Post = {
  _id: String;
  text: String;
  comments: Comment[];
  likes: string[]; //??
  user: CommentUser;
  createdAt: string;
};
type Comment = {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    avatar: Avatar | undefined;
  };
  _id: string;
  text: string;
  createdAt: string;
};
export type { User, CommunityUser, Post, Avatar, Comment };
