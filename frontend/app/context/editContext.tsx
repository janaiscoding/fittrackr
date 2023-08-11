"use client";

// Edit FOR PROFILE.
import React, { useState, createContext } from "react";

type EditContextProviderProps = {
  children: React.ReactNode;
};

type EditContextType = {
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditContext = createContext<EditContextType>(
  {} as EditContextType
);

export const EditContextProvider = ({
  children,
}: EditContextProviderProps) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <EditContext.Provider
      value={{
        showEdit,
        setShowEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
