import React, { useState, useEffect } from "react";

const AssessmentUI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.52:1000/api/assessments/679cb4850fc9f3328b79ce61")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div className="p-6 text-center text-blue-600 font-semibold text-lg">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-r from-blue-100 to-blue-300 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-800 text-center">{data.course_name} Assessment</h1>
      <p className="text-lg text-blue-700 mb-8 text-center">Assessment Type: <span className="font-semibold">{data.assessment_type}</span></p>
      
      <div className="space-y-6">
        {data.data.map((question) => (
          <div key={question._id} className="p-6 border border-blue-500 rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-3 text-blue-900">{question.question_number}: {question.question}</h2>
            <p className="text-blue-700 mb-4 italic">{question.question_instruction}</p>
            <h3 className="font-bold text-blue-800">Suggested Answers:</h3>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-blue-900">
              {question.suggested_answer.map((answer, i) => (
                <li key={i} className="text-blue-800 bg-blue-100 p-2 rounded-lg">{answer}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentUI;