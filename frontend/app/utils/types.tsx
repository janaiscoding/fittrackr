type Avatar = {
  contentType: string;
  data: Buffer;
};

type User = {
  _id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: Avatar;
  workouts: Workout[];
  posts: Post[];
  friends: string[];
  requestsSent: string[];
  requestsReceived: string[];
  createdAt: string;
  updatedAt: string;
};

//todo
type Workout = {
  _id: string;
};

type Post = {
  _id: string;
  text: string;
  comments: Comment[];
  likes: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
  image: Avatar;
};

type Comment = {
  user: User;
  _id: string;
  comment: string;
  createdAt: string;
  likes: string[];
};
export type { User, Post, Avatar, Comment, Workout };
