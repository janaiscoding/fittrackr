"use client";
import React, { useState, createContext } from "react";

type ViewContextProviderProps = {
  children: React.ReactNode;
};

type ViewContextType = {
  viewFeed: boolean;
  setViewFeed: React.Dispatch<React.SetStateAction<boolean>>;
  viewWorkouts: boolean;
  setViewWorkouts: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ViewContext = createContext<ViewContextType>(
  {} as ViewContextType
);

export const ViewContextProvider = ({ children }: ViewContextProviderProps) => {
  const [viewFeed, setViewFeed] = useState<boolean>(true);
  const [viewWorkouts, setViewWorkouts] = useState<boolean>(false);

  return (
    <ViewContext.Provider
      value={{ viewFeed, setViewFeed, viewWorkouts, setViewWorkouts }}
    >
      {children}
    </ViewContext.Provider>
  );
};
