import React, { useState } from 'react';

const FeedbackCard = ({ feedbackData }) => {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-100 shadow-md rounded-lg p-4 mb-4 border border-teal-200">
      <p className="text-teal-700 font-medium">
        <strong>Feedback:</strong> {feedbackData.feedback} | <strong>Total Score:</strong> {feedbackData.Total_Score} | <strong>Percentage:</strong> {feedbackData.percentage}%
      </p>
    </div>
  );
};

const FeedbackApp = () => {
  const [feedbackList, setFeedbackList] = useState([
    {
      feedback: 'The answer is generally correct and relevant, but could be more precise. Binary search is a searching algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array and eliminates half of the array for each comparison.',
      Total_Score: 8,
      percentage: 80.0,
    },
    {
      feedback: 'The explanation provided for the merge sort algorithm was clear and detailed. It correctly described the divide-and-conquer approach and included a valid example.',
      Total_Score: 9,
      percentage: 90.0,
    },
    {
      feedback: 'The response about dynamic programming was informative but lacked examples for better clarity. Including a practical example would enhance understanding.',
      Total_Score: 7,
      percentage: 70.0,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 to-green-200 p-4">
      <h1 className="text-3xl font-bold text-center text-teal-900 mb-6">Feedback Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbackList.map((feedback, index) => (
          <FeedbackCard key={index} feedbackData={feedback} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackApp;
