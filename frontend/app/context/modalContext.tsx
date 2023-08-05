"use client";
import React, { useState, createContext } from "react";

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
