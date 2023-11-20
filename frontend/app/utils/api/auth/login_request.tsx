import { SetStateAction } from "react";
import { loginAPI } from "../endpoints";

const loginRequest = (
  email: string,
  password: string,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  handleSuccess: (data: { token: string }) => void,
  handleError: (data: { errors: { msg: string }[]; message: string }) => void
) => {
  setIsLoading(true);
  fetch(loginAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        handleSuccess(data);
      }
      handleError(data);
    })
    .catch((err) => {
      console.log(err);
      //Maybe add a generic error pop-up, this is required for 500-errors
    });
};
export default loginRequest;
