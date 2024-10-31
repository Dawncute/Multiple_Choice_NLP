import React from 'react';

const ExportButton = ({ questions, exportToPDF }) => {
  return (
    <button onClick={() => exportToPDF(questions)} className="export">
      <i className="fas fa-file-export"></i> EXPORT
    </button>
  );
};

export default ExportButton;
