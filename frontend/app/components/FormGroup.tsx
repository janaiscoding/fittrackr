"use client";

import { SetStateAction } from "react";

type FormProps = {
  labelName: string;
  type: string;
  placeholder: string;
  onChangeSet: React.Dispatch<SetStateAction<any>>;
};

const FormGroup = ({ labelName, type, placeholder, onChangeSet }: FormProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{labelName}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered input-sm"
          onChange={(e) => onChangeSet(e.target.value)}
        />
      </label>
    </div>
  );
};
export default FormGroup;
