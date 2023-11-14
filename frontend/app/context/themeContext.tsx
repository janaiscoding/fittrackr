"use client";
import React, { useState, createContext } from "react";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [current, setCurrent] = useState("dark"); // Always defaulted to dark.
  return (
    <ThemeContext.Provider value={{ current, setCurrent }}>
      {children}
    </ThemeContext.Provider>
  );
};
