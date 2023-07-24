import { useRouter } from "next/navigation";
import { removeJwtToken } from "../api/auth_handler";
// WORKS as intended
const Signout = ({setUserData}:any) => {
  const router = useRouter();
  const handleSignout = () => {
    removeJwtToken();
    setUserData(null)
    router.push("/login");
  };
  return (
    <button className="btn" onClick={handleSignout}>
      Sign out
    </button>
  );
};

export default Signout;
