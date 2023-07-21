type User = {
  first_name: string;
  last_name: string;
  avatar: Avatar;
  requestsReceived: string[];
  requestsSent: string[];
  posts: Post[];
  workouts: any[]; //to do
  createdAt: string;
  updatedAt: string;
  _id: string;
};

type Avatar =
  | {
      contentType: string;
      data: any;
    }
  | undefined;

type Users = {
  first_name: string;
  friends: string[];
  last_name: string;
  avatar: Avatar;
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
type Comment = {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    avatar: Avatar;
  };
  _id: string;
  text: string;
  createdAt: string;
};
export type { User, Users, Post, Avatar,Comment };
