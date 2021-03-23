// This is going to represent the component which will display each question throughout the user experience
import React, { useState } from "react";
import "./Question.css";
import "../../config/fontStyles.css";
import MyButton from "../../components/MyButton/MyButton";
import QuestionsArray from "../../config/QuestionsArray";

// Creates the component
const Question = ({
  currentIndex,
  onNextClick,
  onInputEntered,
  currentUserInputObj,
}) => {
  return (
    <div className={"questionContainer"}>
      {QuestionsArray[currentIndex].questionTitle}
      <div className={"black smallText subtitleContainer"}>
        {QuestionsArray[currentIndex].questionSubtitle}
      </div>
      {QuestionsArray[currentIndex].questionTextInput
        ? QuestionsArray[currentIndex].questionTextInput((textTyped) => {
            onInputEntered(QuestionsArray[currentIndex].objectName, textTyped);
          }, currentUserInputObj[QuestionsArray[currentIndex].objectName])
        : null}
      <MyButton
        text={QuestionsArray[currentIndex].buttonText ?  QuestionsArray[currentIndex].buttonText : "Next"}
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
