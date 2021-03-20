// This is going to represent the component which will display each question throughout the user experience
import React, { useState } from "react";
import "./Question.css";
import "../../config/fontStyles.css";
import MyButton from "../../components/MyButton/MyButton";

// Creates the component
const Question = ({ questionTitle, questionSubtitle, onNextClick }) => {
  return (
    <div className={"questionContainer"}>
      {questionTitle}
      <div className={"black mediumText"}>{questionSubtitle}</div>
      <MyButton
        text={"Next"}
        isDarkMode={false}
        onClick={() => {
          onNextClick();
        }}
      />
    </div>
  );
};

// Exports the component
export default Question;
