import { signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice"

const Header = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector(store => store.user);

  const dispatch = useDispatch()

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


   useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe
  }, []);

  return (
    <div className="absolute w-screen px-6 py-3 bg-linear-to-b from-black z-10 flex justify-between items-center ">
      <img className="w-28 " src="/STREAMGEN.png" alt="logo" />

      {user &&(<div className="flex">
        <img
          className="w-10 h-10 rounded-full"
          alt="usericon"
          src={user.photoURL}
        />
        <button
          className="font-bold text-white cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <p className="text-red-500 font-bold">{errorMessage}</p>
      </div>)}
    </div>
  );
};

export default Header;
