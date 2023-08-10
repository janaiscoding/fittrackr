"use client";
import React, { useState, createContext } from "react";

type ViewContextProviderProps = {
  children: React.ReactNode;
};
enum ViewTabs {
  feed = "feed",
  workouts = "workouts",
}
type ViewContextType = {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
};

export const ViewContext = createContext<ViewContextType>(
  {} as ViewContextType
);

export const ViewContextProvider = ({ children }: ViewContextProviderProps) => {
  const [current, setCurrent] = useState("feed"); // Always defaulted to feed.
  return (
    <ViewContext.Provider value={{ current, setCurrent }}>
      {children}
    </ViewContext.Provider>
  );
};
