"use client";

// MODAL FOR POSTS on mobile view.
import React, { useState, createContext } from "react";

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  modalPost: boolean;
  setModalPost: React.Dispatch<React.SetStateAction<boolean>>;
  modalBell: boolean;
  setModalBell: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modalPost, setModalPost] = useState(false);
  const [modalBell, setModalBell] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        modalPost,
        setModalPost,
        modalBell,
        setModalBell,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
