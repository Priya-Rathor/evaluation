import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, Eye, Plus, Sun, Moon } from "lucide-react";

const API_URL = "http://192.168.1.52:1000/api/courses/679b44188fd2aabac0a05686";

export default function AssessmentsList() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.data.assessments) {
          setAssessments(response.data.assessments);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (id, event) => {
    setSelectedFiles((prev) => ({ ...prev, [id]: event.target.files[0] }));
  };

  const handleUpload = (id) => {
    if (!selectedFiles[id]) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFiles[id]);

    axios
      .post(`${API_URL}/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("File uploaded successfully", response.data);
        alert("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Failed to upload file.");
      });
  };

  const handleView = (id) => {
    console.log(`View Assessment ID: ${id}`);
  };

  const handleCreate = (id) => {
    console.log(`Create new assessment for ID: ${id}`);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen p-4 transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Assessments</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      
      {loading ? (
        <p>Loading assessments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 dark:bg-write">
                <th className="border p-2">#</th>
                <th className="border p-2">Assessment Name</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length > 0 ? (
                assessments.map((assessment, index) => (
                  <tr key={assessment._id} className="text-center border-b dark:border-gray-700">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{assessment.name}</td>
                    <td className="border p-2 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row items-center justify-center">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(assessment._id, e)}
                        className="border p-1 rounded text-xs w-full sm:w-auto"
                      />
                      <button
                        onClick={() => handleUpload(assessment._id)}
                        className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-1" /> Upload
                      </button>
                      <button
                        onClick={() => handleView(assessment._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleCreate(assessment._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Create
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    No assessments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}