import React, { useState } from "react";

const LearnerList = () => {
  const [learners, setLearners] = useState([
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" }
  ]);

  const [addMethod, setAddMethod] = useState("none"); // 'none', 'choose', 'form', 'csv'
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null or index of learner being edited

  // Handle "Add Learner" button click
  const handleAddLearnerClick = () => {
    setAddMethod("choose");
    setEditIndex(null); // Ensure no edit is in progress
  };

  // Handle selection of add method
  const handleSelectAddMethod = (method) => {
    if (method === "form") {
      setShowForm(true);
    } else if (method === "csv") {
      setShowCSVUpload(true);
    }
    setAddMethod(method);
  };

  // Handle form submission for adding or editing
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    if (name && email) {
      if (editIndex !== null) {
        // Editing existing learner
        const updatedLearners = learners.map((learner, index) =>
          index === editIndex ? { name, email } : learner
        );
        setLearners(updatedLearners);
      } else {
        // Adding new learner
        setLearners([...learners, { name, email }]);
      }
      // Reset states
      setShowForm(false);
      setAddMethod("none");
      setEditIndex(null);
    }
  };

  // Handle CSV upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const lines = event.target.result.split("\n").slice(1); // Skip header
        const newLearners = lines
          .map((line) => {
            const columns = line.split(",");
            if (columns.length >= 2) {
              const name = columns[0]?.trim();
              const email = columns[1]?.trim();
              return name && email ? { name, email } : null;
            }
            return null;
          })
          .filter((learner) => learner !== null);
        setLearners([...learners, ...newLearners]);
        // Reset states
        setShowCSVUpload(false);
        setAddMethod("none");
      };
      reader.readAsText(file);
    }
  };

  // Handle deletion of a learner
  const handleDelete = (index) => {
    setLearners(learners.filter((_, i) => i !== index));
  };

  // Handle editing of a learner
  const handleEdit = (index) => {
    setEditIndex(index);
    setAddMethod("form");
    setShowForm(true);
  };

  // Handle cancellation of add or edit forms
  const handleCancel = () => {
    setAddMethod("none");
    setShowForm(false);
    setShowCSVUpload(false);
    setEditIndex(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Learners</h1>
        <button
          onClick={handleAddLearnerClick}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Add Learner
        </button>
      </div>

      {/* Learners List */}
      <ul className="bg-white shadow-lg rounded-lg p-6 divide-y divide-gray-200">
        {learners.map((learner, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-lg font-medium text-gray-800">{learner.name}</span>
                <br />
                <span className="text-sm text-gray-600">{learner.email}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Method Selection */}
      {addMethod === "choose" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add Learner</h2>
            <button
              onClick={() => handleSelectAddMethod("form")}
              className="block w-full px-4 py-2 mb-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              Add with Form
            </button>
            <button
              onClick={() => handleSelectAddMethod("csv")}
              className="block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              Add with CSV
            </button>
            <button
              onClick={handleCancel}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              {editIndex !== null ? "Edit Learner" : "Add Learner"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editIndex !== null ? learners[editIndex].name : ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={editIndex !== null ? learners[editIndex].email : ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  {editIndex !== null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Upload */}
      {showCSVUpload && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Upload CSV</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleCancel}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnerList;
