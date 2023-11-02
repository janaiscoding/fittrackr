import loginRequest from "../utils/api/auth/login_request";

const loginDemo = (
  handleSuccess: (data: { token: string }) => void,
  handleError: (data: { errors: { msg: string }[]; message: string }) => void
) => {
  loginRequest(
    //@ts-ignore
    process.env.NEXT_PUBLIC_DEMO_EMAIL,
    process.env.NEXT_PUBLIC_DEMO_PASSWORD,
    handleSuccess,
    handleError
  );
};

export default loginDemo;
