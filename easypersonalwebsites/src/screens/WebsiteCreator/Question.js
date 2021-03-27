// This is going to represent the component which will display each question throughout the user experience
import React, { useState } from "react";
import "./Question.css";
import "../../config/fontStyles.css";
import MyButton from "../../components/MyButton/MyButton";
import QuestionsArray from "../../config/QuestionsArray";
import { searchDomain } from "../../config/server";
import { sleep } from "../../config/sleep";
import FadeIn from "react-fade-in";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Creates the component
const Question = ({
  currentIndex,
  onNextClick,
  onInputEntered,
  currentUserInputObj,
}) => {
  // The state for checking availability of the domain name
  const [domainName, setDomainName] = useState("");
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isDomainAvailable, setIsDomainAvailable] = useState("");

  return (
    <div className={"questionContainer"}>
      <div className={'questionTitleContainer'}>
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
              if (QuestionsArray[currentIndex].objectName === "domainName") {
                setIsDomainAvailable("");
                setIsCheckingDomain(false);
                setDomainName(textTyped);
              }
              onInputEntered(
                QuestionsArray[currentIndex].objectName,
                textTyped
              );
            },
            currentUserInputObj[QuestionsArray[currentIndex].objectName],
            currentUserInputObj.theme
          )
        : null}
      {QuestionsArray[currentIndex].objectName === "domainName" ? (
        isDomainAvailable === true ? (
          <FadeIn visible={isDomainAvailable && isCheckingDomain === false} className={"domainStatus"}>
            <FontAwesomeIcon
              icon={["fas", "check"]}
              color={
                currentUserInputObj.theme === "light" ? "#0e8afc" : "#ccd7f6"
              }
              size={"5x"}
            />
            <div className={"tinyText black"}>
              Great! This domain name is available
            </div>
          </FadeIn>
        ) : isDomainAvailable === false ? (
          <FadeIn visible={!isDomainAvailable && isCheckingDomain === false} className={"domainStatus"}>
            <FontAwesomeIcon
              icon={["fas", "times"]}
              color={
                currentUserInputObj.theme === "light" ? "#0e8afc" : "#ccd7f6"
              }
              size={"5x"}
            />
            <div className={"tinyText black"}>
              Sorry, this domain name is unavailable. Please choose a different one.
            </div>
          </FadeIn>
        ) : null
      ) : null}
      {QuestionsArray[currentIndex].objectName === "domainName" &&
      isCheckingDomain ? (
        <FadeIn visible={isCheckingDomain}>
          <ReactLoading
            type={"spin"}
            color={
              currentUserInputObj.theme === "light" ? "#0e8afc" : "#64ffda"
            }
            height={"10vh"}
          />
        </FadeIn>
      ) : (
        <MyButton
          text={
            QuestionsArray[currentIndex].objectName === "domainName" &&
            isDomainAvailable
              ? "Finish"
              : "Next"
          }
          isDarkMode={currentUserInputObj.theme === "dark"}
          onClick={async () => {
            if (QuestionsArray[currentIndex].objectName !== "domainName") {
              onNextClick();
            } else if (
              isDomainAvailable === false ||
              isDomainAvailable === ""
            ) {
              if (domainName.trim().length > 0) {
                setIsCheckingDomain(true);
                const result = await searchDomain(domainName);
                await sleep(500);
                if (result !== -1 && result <= 12.99) {
                  setIsDomainAvailable(true);
                } else {
                  setIsDomainAvailable(false);
                }
                setIsCheckingDomain(false);
              }
            } else {
              // Moves to payment
            }
          }}
        />
      )}
    </div>
  );
};

// Exports the component
export default Question;
