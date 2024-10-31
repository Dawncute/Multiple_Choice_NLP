export const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  export const countSentences = (text) => {
    if (typeof text !== "string") {
      text = ""; // Default to empty string if text is not a valid string
    }
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  };
  
  