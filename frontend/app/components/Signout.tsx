import { useRouter } from "next/navigation";
import { removeJwtToken } from "../utils/auth_handler";
// WORKS as intended
const Signout = () => {
  const router = useRouter();
  const handleSignout = () => {
    removeJwtToken();
    router.push("/login");
  };
  return (
    <button className="btn" onClick={handleSignout}>
      Sign out
    </button>
  );
};

export default Signout;
