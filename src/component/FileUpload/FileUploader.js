import React from 'react';
import pdfToText from 'react-pdftotext';

const FileUploader = ({ setSelectedFile, setText }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      if (file.type === 'application/pdf') {
        pdfToText(file)
          .then(text => {
            const cleanedText = text.replace(/([^\S\r\n]+)(?=\S)/g, ' ');
            setText(cleanedText);
          })
          .catch(error => console.error("Failed to extract text from pdf"));
      } else if (file.type === 'text/plain') {
        const fileText = await file.text();
        setText(fileText);
      } else {
        console.error("Unsupported file type.");
      }
    }
  };

  return (
    <button className="import-file-button">
      <label htmlFor="file-upload" className="custom-file-upload">
        Import from file TXT or PDF
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".txt, .pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </button>
  );
};

export default FileUploader;
