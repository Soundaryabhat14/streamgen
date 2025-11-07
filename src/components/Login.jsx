import { useState, useRef } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = validateData(
      email.current.value,
      password.current.value
      // name.current.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://in.pinterest.com/pin/140806234337698/",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, "-", errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, "-", errorMessage);
        });
    }
  };

  const toggleSignForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1920&q=80"
          alt="logo"
        ></img>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 bg-black/70 p-10 rounded-lg  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="font-bold text-3xl text-white mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 mb-4 w-full bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 mb-4 w-full bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 mb-4 w-full bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <p className="text-red-500  font-semibold py-2">{errorMessage}</p>

        <button
          type="button"
          onClick={handleButtonClick}
          className="p-3 w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded mt-2 transition cursor-pointer"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white py-4 cursor-pointer" onClick={toggleSignForm}>
          {isSignInForm
            ? "New to Streamflix? Sign Up Now"
            : "Already Registered? Sign In now.."}
        </p>
      </form>
    </div>
  );
};

export default Login;
