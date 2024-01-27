import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; 

const FlashcardGenerator = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleGenerateFlashcard = () => {
    if (question.trim() === "" || answer.trim() === "") {
      alert("Please enter both question and answer.");
      return;
    }

    const newFlashcard = { question, answer };
    setFlashcards([...flashcards, newFlashcard]);

    
    setQuestion("");
    setAnswer("");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Flashcard Generator</h1>
        <button
          onClick={handleLogout}
          className="text-blue-500 hover:underline"
        >
          Logout
        </button>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Question:</label>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            className="w-full border p-2"
            placeholder="Enter the question"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            className="w-full border p-2"
            placeholder="Enter the answer"
          />
        </div>
        <button
          type="button"
          onClick={handleGenerateFlashcard}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Flashcard
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Flashcards:</h2>
        <ul>
          {flashcards.map((flashcard, index) => (
            <li key={index} className="mb-2">
              <strong>{flashcard.question}</strong> - {flashcard.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlashcardGenerator;
