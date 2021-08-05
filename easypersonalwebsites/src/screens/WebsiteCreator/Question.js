// This is going to represent the component which will display each question throughout the user experience
 dj;j import React, { useState } from "react";
import "./Question.css";
import "../../config/fontStyles.css";
import MyButton from "../../components/MyButton/MyButton";
import QuestionsArray from "../../config/QuestionsArray";
import Modal from "react-awesome-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Creates the component
const Question = ({
  currentIndex,
  onNextClick,
  onInputEntered,
  currentUserInputObj,
  goToPayment,
}) => {
  // State of error
  const [isFieldsErrorVisible, setIsFieldsErrorVisible] = useState(false);

  // Opens in a new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className={"questionContainer"}>
      <div className={"questionTitleContainer"}>
        {QuestionsArray[currentIndex].questionTitle(currentUserInputObj.theme)}
      </div>
      <div className={"black smallText subtitleContainer"}>
        {QuestionsArray[currentIndex].questionSubtitle(
          currentUserInputObj.theme
        )}
      </div>
      {QuestionsArray[currentIndex].questionInput
        ? QuestionsArray[currentIndex].questionInput(
            (textTyped) => {
              onInputEntered(
                QuestionsArray[currentIndex].objectName,
                textTyped
              );
            },
            currentUserInputObj[QuestionsArray[currentIndex].objectName],
            currentUserInputObj.theme
          )
        : null}
      <MyButton
        text={
          QuestionsArray[currentIndex].objectName === "socialMedias"
            ? "Finish"
            : "Next"
        }
        isDarkMode={currentUserInputObj.theme === "dark"}
        onClick={async () => {
          if (QuestionsArray[currentIndex].objectName !== "socialMedias") {
            if (
              QuestionsArray[currentIndex].isCompleted(
                currentUserInputObj[QuestionsArray[currentIndex].objectName]
              )
            ) {
              onNextClick();
            } else {
              setIsFieldsErrorVisible(true);
            }
          } else {
            // Moves to payment
            goToPayment();
          }
        }}
      />
      <div className={"exampleContainer"}>
        <div
          className={"smallText blue italics underline clickable"}
          onClick={() => {
            const expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + 1);
            openInNewTab(
              "https://easypersonalwebsites.com/sXvjnA9Mi60qhXy2Gcb1"
            );
          }}
        >
          See an Example
        </div>
      </div>
      <Modal
        visible={isFieldsErrorVisible}
        effect="fadeInUp"
        onClickAway={() => setIsFieldsErrorVisible(false)}
      >
        <div className={"completeAllFields"}>
          <FontAwesomeIcon
            icon={["fas", "exclamation-triangle"]}
            color={"#0e8afc"}
            size={"3x"}
          />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"smallText black"}>
            Please complete all of the fields properly
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <MyButton
            payButton={false}
            text={"Ok"}
            onClick={async () => {
              setIsFieldsErrorVisible(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

// Exports the component
export default Question;
