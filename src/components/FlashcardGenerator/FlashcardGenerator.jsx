import React, { useState } from "react";

const FlashcardGenerator = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Flashcard generated:", { question, answer });

    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Flashcard Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">
            Question:
          </label>
          <input
            type="text"
            id="question"
            className="w-full border rounded py-2 px-3"
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block text-gray-700 text-sm font-bold mb-2">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            className="w-full border rounded py-2 px-3"
            value={answer}
            onChange={handleAnswerChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Flashcard
        </button>
      </form>
    </div>
  );
};

export default FlashcardGenerator;
