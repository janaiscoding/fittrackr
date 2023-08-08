type Avatar = {
  contentType: string;
  data: Buffer;
};

type User = {
  _id: string;
  first_name: string;
  last_name: string;
  // birthday: string;
  bio: string;
  avatar: Avatar;
  workouts: Workout[];
  posts: ProfilePost[];
  friends: string[];
  requestsSent: string[];
  requestsReceived: string[];
  createdAt: string;
  updatedAt: string;
};

type ProfilePost = {
  comments: any[];
  createdAt: string;
  image: Avatar;
  likes: string[];
  text: string;
  updatedAt: string;
  user: string;
  _id: string;
};

//todo
type Workout = {
  _id: string;
};
type CommunityUser = {
  // community, friends, friend req sent/received
  //all users - only displays name, pic and numbered stats of posts workouts and friends
  _id: string;
  bio: string;
  first_name: string;
  last_name: string;
  avatar: Avatar;
  posts: string[];
  workouts: string[];
  friends: string[];
  requestsReceived: string[];
};
type ShortUser = {
  //on any post!
  _id: string;
  first_name: string;
  last_name: string;
  avatar: Avatar;
};

type Post = {
  _id: string;
  text: string;
  comments: Comment[];
  likes: string[]; //??
  user: ShortUser;
  createdAt: string;
  updatedAt: string;
  image: Avatar;
};

type Comment = {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    avatar: Avatar;
  };
  _id: string;
  comment: string;
  createdAt: string;
  likes: string[];
};
export type {
  ShortUser,
  User,
  CommunityUser,
  ProfilePost,
  Post,
  Avatar,
  Comment,
  Workout,
};
