import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="absolute w-screen px-6 py-3 bg-linear-to-b from-black z-10 flex justify-between items-center ">
      <img className="w-28 " src="/STREAMGEN.png" alt="logo" />

      <div className="flex">
        <img
          className="w-10 h-10 rounded-full"
          alt="usericon"
          src="https://cdn-icons-png.flaticon.com/128/9131/9131646.png"
        />
        <button
          className="font-bold text-white cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <p className="text-red-500 font-bold">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Header;
