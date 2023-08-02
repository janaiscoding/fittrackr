import { SetStateAction } from "react";

export type ModalProps = {
    isShown: boolean;
    setShown: React.Dispatch<SetStateAction<boolean>>;
  };