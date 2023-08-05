import Logo from "../../assets/Logo";
import Notification from "../../assets/svgs/Notification";

const TopNav = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between md:justify-center items-center py-2 px-4 bg-blue border-solid border-b border-yellow2 md:px-20">
      <Logo />
      <Notification />
    </nav>
  );
};

export default TopNav;
