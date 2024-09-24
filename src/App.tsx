import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import './App.css';

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const handleZoom = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Code Highlighter</h1>

      {/* Dropdown to select language */}
      <div className="mb-4">
        <label htmlFor="language-select" className="mr-2 font-medium">Chọn ngôn ngữ:</label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          className="border rounded p-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>

      {/* Input area for code */}
      <textarea
        value={code}
        onChange={handleChange}
        placeholder="Dán code của bạn vào đây..."
        rows={10}
        className="w-full p-3 border rounded mb-4 text-base"
      ></textarea>

      {/* Display the highlighted code */}
      <div className="p-4 rounded bg-gray-800 text-white relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
        >
          Copy Code
        </button>
        <button
          onClick={handleZoom}
          className="absolute top-2 right-16 bg-green-500 text-white p-2 rounded"
        >
          Zoom Code
        </button>
        <SyntaxHighlighter language={language} style={darcula}>
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Modal for zoomed code */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
            <SyntaxHighlighter language={language} style={darcula}>
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;