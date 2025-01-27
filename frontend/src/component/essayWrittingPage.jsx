import React, { useState } from "react";

const EssayWriting = () => {
  const [essay, setEssay] = useState("");
  const [topic, setTopic] = useState(""); // State for topic
  const [feedback, setFeedback] = useState({}); // State for feedback
  const [isLoading, setIsLoading] = useState(false);

  const handleEssayChange = (e) => {
    setEssay(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  // Function to get AI feedback from backend
  const getAIFeedback = async () => {
    if (!essay.trim()) {
      setFeedback({ error: "Please write an essay before checking for mistakes." });
      return;
    }
    if (!topic.trim()) {
      setFeedback({ error: "Please provide a topic for the essay." });
      return;
    }

    setIsLoading(true);
    setFeedback({}); // Clear previous feedback

    try {
      const response = await fetch("http://127.0.0.1:8000/evaluate-essay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ essay: essay, topic: topic }), // Sending both essay and topic to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to analyze essay.");
      }

      const data = await response.json();
      setFeedback(data.results || { error: "No specific feedback provided." });
    } catch (error) {
      setFeedback({ error: "An error occurred while analyzing the essay." });
    } finally {
      setIsLoading(false);
    }
  };

  // Render feedback dynamically with limit on the number of lines per category
  const renderFeedback = () => {
    if (feedback.error) {
      return <p className="text-red-500">{feedback.error}</p>;
    }

    // Limit to only 5-10 lines per category
    const maxLines = 10;  // Limit to 10 lines per feedback category
    const maxCategories = 3; // Limit to 3 categories

    return Object.entries(feedback)
      .slice(0, maxCategories) // Show only the first 3 categories
      .map(([category, message]) => {
        // Limit feedback message to 10 lines
        const limitedMessage = message.split('\n').slice(0, maxLines).join('\n');
        return (
          <div key={category} className="mb-6">
            <h4 className="text-lg font-semibold text-indigo-600 capitalize">
              {category.replace(/_/g, " ")}
            </h4>
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap leading-relaxed">
              {limitedMessage}
            </p>
          </div>
        );
      });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-screen-lg w-full bg-white shadow-lg rounded-3xl p-8 lg:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">Essay Writing</h1>
          <p className="text-gray-600 text-sm mt-2 max-w-xs mx-auto">
            Write your essay below and let AI check for mistakes!
          </p>
        </div>

        {/* Input for Topic */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter the essay topic"
            value={topic}
            onChange={handleTopicChange}
            className="w-full p-6 text-lg rounded-lg border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Textarea to write the essay */}
        <textarea
          placeholder="Write your essay here..."
          value={essay}
          onChange={handleEssayChange}
          rows={12}
          className="w-full p-6 text-lg rounded-lg border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-indigo-500 mb-6 transition-all duration-300 ease-in-out transform hover:scale-105"
        />

        {/* Button to trigger AI feedback */}
        <div className="flex justify-center mb-8">
          <button
            onClick={getAIFeedback}
            className="bg-indigo-500 text-white py-3 px-8 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span>Analyzing...</span>
              </span>
            ) : (
              "Get AI Feedback"
            )}
          </button>
        </div>

        {/* Enhanced Feedback area */}
        <div className="mt-8 p-8 bg-white shadow-xl border-t-4 border-indigo-500 rounded-2xl">
          <h3 className="text-2xl font-semibold text-indigo-600">AI Feedback</h3>
          <div className="mt-4">{renderFeedback()}</div>
        </div>
      </div>
    </div>
  );
};

export default EssayWriting;
