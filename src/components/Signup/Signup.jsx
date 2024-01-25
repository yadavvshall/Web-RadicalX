import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";



function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-purple-800">
      <div className="min-w-[480px] bg-white shadow-md p-8 rounded-lg flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-center text-purple-800">Signup</h1>
  
        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
  
        <div className="flex flex-col gap-4">
          <b className="text-red-600 font-bold text-center">{errorMsg}</b>
          <button
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
            className={`${
              submitButtonDisabled
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white rounded-md font-bold py-2 transition duration-100 w-full`}
          >
            Signup
          </button>
          <p className="font-bold text-black">
            Already have an account?{' '}
            <span>
              <Link to="/login" className="text-purple-600">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default Signup;
