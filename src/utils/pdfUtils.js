import jsPDF from 'jspdf';

export const exportToPDF = (questions) => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  
  let yPosition = 10; // Start position for text

  questions.forEach((question, index) => {
    if (yPosition >= doc.internal.pageSize.height - 10) {
      doc.addPage();
      yPosition = 10;
    }

    doc.text(`Question ${index + 1}: ${question.questionText}`, 10, yPosition);
    yPosition += 7;

    question.allAnswers.forEach((answer, answerIndex) => {
      doc.text(`${String.fromCharCode(65 + answerIndex)}. ${answer}`, 10, yPosition);
      yPosition += 5;
    });

    const correctAnswerIndex = question.allAnswers.indexOf(question.correctAnswer);
    const correctAnswerLetter = String.fromCharCode(65 + correctAnswerIndex);
    yPosition += 2;
    doc.text(`Correct Answer: ${correctAnswerLetter}`, 10, yPosition);

    yPosition += 15;
  });

  doc.save(`Questions.pdf`);
};
