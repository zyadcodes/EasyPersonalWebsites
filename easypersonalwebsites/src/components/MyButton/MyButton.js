// This is going to be the button component for the website
import React from "react";
import "./MyButton.css";
import "../../config/fontStyles.css";

// Declares the component
const MyButton = ({ text, onClick, isDarkMode }) => {
  // Returns the component
  return (
    <button
      className={
        isDarkMode
          ? "myButtonContainer dark mediumText bold white"
          : "myButtonContainer mediumText bold white"
      }
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

// Exports the component
export default MyButton;
