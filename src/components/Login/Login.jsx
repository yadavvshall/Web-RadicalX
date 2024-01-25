import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Create Google authentication provider
  const googleProvider = new GoogleAuthProvider();

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      setSubmitButtonDisabled(true);

      const result = await signInWithPopup(auth, googleProvider);

      // The user is signed in with Google. You can access the user information using result.user
      console.log("Google Sign-In Successful:", result.user);

      setSubmitButtonDisabled(false);
      navigate("/");
    } catch (error) {
      setSubmitButtonDisabled(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-purple-800">
      <div className="min-w-96 p-8 bg-white shadow-md rounded-lg flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-center text-purple-800">
          Login
        </h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className="flex flex-col gap-4">
          <b className="text-red-600 font-bold text-center">{errorMsg}</b>
          <button
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
            className={`${
              submitButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white rounded-md font-bold py-2`}
          >
            Login
          </button>
          <button
            disabled={submitButtonDisabled}
            onClick={handleGoogleSignIn}
            className={`${
              submitButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } text-white rounded-md font-bold py-2`}
          >
            Sign in with Google
          </button>
          <p className="font-bold text-black">
            Already have an account?{" "}
            <span>
              <Link to="/signup" className="text-purple-600">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
