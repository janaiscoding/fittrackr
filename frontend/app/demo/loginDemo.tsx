import loginRequest from "../utils/api/auth/login_request";

const loginDemo = (
    handleSuccess: (data: { token: string }) => void,
    handleError: (data: { errors: { msg: string }[]; message: string }) => void
) => {
  loginRequest("demo.user@mail.com", "pass2123!!@34", handleSuccess, handleError);
};

export default loginDemo;
