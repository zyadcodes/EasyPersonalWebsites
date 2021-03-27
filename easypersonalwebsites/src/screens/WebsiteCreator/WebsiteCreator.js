// This file is going to contain the website creator steps and will handle all logic for automically creating
// the website and capturing payment
import React, { useState, useEffect } from "react";
import "./WebsiteCreator.css";
import "../../config/fontStyles.css";
import EPWLogo from "../../assets/EPW Logo.png";
import { sleep } from "../../config/sleep";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import MyButton from "../../components/MyButton/MyButton";
import FadeIn from "react-fade-in";
import Question from "./Question";
import QuestionsArray from "../../config/QuestionsArray";

// Creates and exports the functional component
const WebsiteCreator = () => {
  // The state variables for the screen
  const [isIntroScreenShowing, setIsIntroScreenShowing] = useState(true);
  const [isLogoTextShowing, setIsLogoTextShowing] = useState(true);
  const [isHiScreenShowing, setIsHiScreenShowing] = useState(false);
  const [isHiDivShowing, setIsHiDivShowing] = useState(true);
  const [questionIndexSelected, setQuestionIndexSelected] = useState(0);
  const [barIndexSelected, setBarIndexSelected] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);
  const [userInput, setUserInput] = useState({ theme: "light" });


  // The useEffect method will start the animation for the logo to disappear and transition up
  useEffect(() => {
    startAnimation();
  }, []);

  // Starts the animation according to the useEffect method
  const startAnimation = async () => {
    await sleep(2000);
    setIsLogoTextShowing(false);
    await sleep(1000);
    setIsHiScreenShowing(true);
    setIsIntroScreenShowing(false);
  };

  if (isIntroScreenShowing) {
    // Returns the UI of the intro screen
    return (
      <div>
        <FadeIn visible={isLogoTextShowing}>
          <div className={"logoTextContainer"}>
            <img src={EPWLogo} className={"bigLogo"} />
            <div className={"largestText blue bold"}>
              Easy Personal Websites
            </div>
            <div className={"mediumText blue"}>
              Create Your Website in 5 Minutes
            </div>
          </div>
        </FadeIn>
      </div>
    );
  } else if (isHiScreenShowing) {
    return (
      <FadeIn visible={isHiDivShowing}>
        <div className={"hiScreenContainer"}>
          <img src={EPWLogo} className={"smallLogo"} />
          <Typist
            className={"typistContainer"}
            cursor={{ show: false }}
            startDelay={550}
          >
            <a className={"largestText black bold"}>
              Hi, my name is <span className={"blue"}>Zyad.</span>
            </a>
            <br />
            <br />
            <br />
            <Typist.Delay ms={500} />
            <a className={"largestText black bold"}>
              I <span className={"blue"}>build websites.</span>
            </a>
            <br />
            <br />
            <br />
            <Typist.Delay ms={500} />
            <a className={"largestText black bold"}>
              Let me help you build <span className={"blue"}>yours.</span>
            </a>
            <br />
            <br />
            <br />
            <Typist.Delay ms={500} />
            <a className={"largestText black bold"}>
              It'll take <span className={"blue"}>five</span> minutes.
            </a>
          </Typist>
          <FadeIn delay={9300}>
            <div className={"letsGoButton"}>
              <MyButton
                text={"Let's Go"}
                isDarkMode={false}
                onClick={async () => {
                  setIsHiDivShowing(false);
                  await sleep(1000);
                  setIsHiScreenShowing(false);
                }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={9300} className={"createdWebsiteMessage"}>
            <div className={"tinyText gray"}>
              If you’ve created a website with us and would like to edit or
              remove your website, please reach out to us at
              easypersonalwebsites@gmail.com.
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    );
  } else {
    return (
      <div className={"allQuestionsContainer" + " " + userInput.theme}>
        <img
          src={EPWLogo}
          className={"smallLogo clickable"}
          onClick={async () => {
            // Navigates to the first step
            if (questionIndexSelected !== 0) {
              setIsQuestionVisible(false);
              setBarIndexSelected(0);
              await sleep(400);
              setQuestionIndexSelected(0);
              setIsQuestionVisible(true);
            }
          }}
        />
        <div className={"stepContainer"}>
          {QuestionsArray.map((eachQuestion, index) => (
            <div
              onClick={async () => {
                // Navigates the clicked step
                if (barIndexSelected !== index) {
                  setIsQuestionVisible(false);
                  setBarIndexSelected(index);
                  await sleep(400);
                  setQuestionIndexSelected(index);
                  setIsQuestionVisible(true);
                }
              }}
              className={
                barIndexSelected === index ? "step selected bar" + userInput.theme : "step unselected bar" 
              }
            />
          ))}
        </div>
        <FadeIn visible={isQuestionVisible} transitionDuration={300}>
          <Question
            currentIndex={questionIndexSelected}
            onInputEntered={(objectName, input) => {
              const currentUserObject = userInput;
              currentUserObject[objectName] = input;
              setUserInput(currentUserObject);
              setUpdateScreen(!updateScreen);
            }}
            currentUserInputObj={userInput}
            onNextClick={async () => {
              // Navigates to the next step
              setIsQuestionVisible(false);
              setBarIndexSelected(questionIndexSelected + 1);
              await sleep(400);
              setQuestionIndexSelected(questionIndexSelected + 1);
              setIsQuestionVisible(true);
            }}
          />
        </FadeIn>
      </div>
    );
  }
};

// Exports the component
export default WebsiteCreator;
