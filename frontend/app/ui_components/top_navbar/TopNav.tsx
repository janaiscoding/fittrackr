import Logo from "../../assets/svgs/Logo";
import Notification from "../../assets/svgs/Notification";

const TopNav = () => {
  return (
    <nav className=" sticky top-0 flex justify-between items-center py-2 px-6 bg-black shadow-sm border-solid border-b border-secondary-green">
      <Logo />
      <Notification />
    </nav>
  );
};

export default TopNav;
