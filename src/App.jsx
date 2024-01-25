import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlashcardGenerator from "./components/FlashcardGenerator/FlashcardGenerator"; // Import your FlashcardGenerator component
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">
                  Flashcard Generating App
                </h1>
                {userName ? (
                  <>
                    <FlashcardGenerator />
                  </>
                ) : (
                  <Home name={userName} />
                )}
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
