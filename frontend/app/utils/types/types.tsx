type User = {
  first_name: string;
  last_name: string;
  avatar: {
    contentType: string;
    data: any;
  } | null;
  _id: string;
};
type Avatar = {
  contentType: string;
  data: any;
};
type FullUser = {
  first_name: string;
  last_name: string;
  avatar: {
    contentType: string;
    data: any;
  } | null;
  _id: string;
  friends: [];
  posts: [Post];
  workouts: [];
};
type Users = {
  first_name: string;
  friends: string[];
  last_name: string;
  avatar: {
    contentType: string;
    data: any;
  } | null;
  posts: {}[];
  requestsReceived: string[];
  workouts: {}[];
  _id: string;
};

type Post = {
  _id: string;
  text: string;
  comments: {}[];
  likes: {}[]; //??
  user: User;
  createdAt: string;
};

export type { User, FullUser, Users, Post, Avatar };
