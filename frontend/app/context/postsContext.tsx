"use client";
import React, { useState, createContext } from "react";
import { Post } from "../utils/types";


type PostsContextProviderProps = {
  children: React.ReactNode;
};

type PostsContextType = {
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
};

export const PostsContext = createContext<PostsContextType>(
  {} as PostsContextType
);

export const PostsContextProvider = ({
  children,
}: PostsContextProviderProps) => {
  const [posts, setPosts] = useState<Post[] | null>([] as Post[]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
