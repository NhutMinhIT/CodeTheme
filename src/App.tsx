import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import html2canvas from "html2canvas";  // Import thư viện để chụp ảnh
import './App.css';

// Khai báo thuộc tính 'FB' cho window
declare global {
  interface Window {
    FB: any;
  }
}

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

  // Hàm chụp ảnh code và chia sẻ lên Facebook Story
  const handleShareToStory = () => {
    const element = document.getElementById("code-container");
    if (element) {
      html2canvas(element).then(canvas => {
        const image = canvas.toDataURL("image/png");

        // Chia sẻ lên Facebook Story thông qua SDK
        if (window.FB) {
          window.FB.ui({
            method: "share",
            href: image,
            display: "popup",
          }, function (response: any) {
            if (response && !response.error_message) {
              alert("Shared successfully!");
            } else {
              alert("Error while sharing.");
            }
          });
        }
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Code Highlighter</h1>

      {/* Dropdown để chọn ngôn ngữ */}
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

      {/* Textarea để nhập code */}
      <textarea
        value={code}
        onChange={handleChange}
        placeholder="Dán code của bạn vào đây..."
        rows={10}
        className="w-full p-3 border rounded mb-4 text-base"
      ></textarea>

      {/* Hiển thị code đã highlight */}
      <div id="code-container" className="p-4 rounded bg-gray-800 text-white relative">
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

      {/* Nút chia sẻ lên Facebook Story */}
      <button
        onClick={handleShareToStory}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Share to Facebook Story
      </button>

      {/* Modal để zoom code */}
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
