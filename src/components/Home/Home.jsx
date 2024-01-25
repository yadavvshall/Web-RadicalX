/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">
          <Link
            to="/login"
            className="text-blue-500 hover:underline focus:underline"
          >
            Login
          </Link>
        </h1>
        <h1 className="text-3xl font-bold">
          <Link
            to="/signup"
            className="text-green-500 hover:underline focus:underline"
          >
            Signup
          </Link>
        </h1>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">
          {props.name ? (
            <span className="text-purple-500">{`Welcome - ${props.name}`}</span>
          ) : (
            <span className="text-gray-500">Login please</span>
          )}
        </h2>
      </div>
    </div>
  );
}

export default Home;
