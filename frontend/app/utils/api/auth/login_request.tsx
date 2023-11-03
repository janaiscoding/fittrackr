import { loginAPI } from "../endpoints";

const loginRequest = (
  email: string,
  password: string,
  handleSuccess: (data: { token: string }) => void,
  handleError: (data: { errors: { msg: string }[]; message: string }) => void
) => {
  fetch(loginAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      if (data.token) {
        handleSuccess(data);
      }
      handleError(data);
    })
    .catch((err) => {
      console.log(err);
      //some generic error pop-up
    });
};
export default loginRequest;
