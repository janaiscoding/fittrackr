type ImageType = {
  url: string;
  alt: string;
};

type User = {
  _id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: ImageType;
  banner: ImageType;
  posts: Post[];
  friends: string[];
  requestsSent: string[];
  requestsReceived: string[];
  createdAt: string;
  updatedAt: string;
};

type Post = {
  _id: string;
  description: string;
  comments: Comment[];
  likes: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
  image: ImageType;
};

type Comment = {
  user: User;
  _id: string;
  comment: string;
  createdAt: string;
  likes: string[];
};
export type { User, Post, ImageType, Comment };
