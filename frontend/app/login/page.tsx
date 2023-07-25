import Logo from "../assets/svgs/Logo";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen home-image flex flex-col justify-between items-center">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default Login;
