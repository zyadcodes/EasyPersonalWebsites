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
        </div>
      </FadeIn>
    );
  } else {
    return QuestionsArray.map((eachQuestion, index) => (
      <FadeIn visible={questionIndexSelected === index}>
        <Question
          questionTitle={eachQuestion.questionTitle}
          questionSubtitle={eachQuestion.questionSubtitle}
          onNextClick={async () => {
            const currentIndexSelected = questionIndexSelected;
            setQuestionIndexSelected(-1);
            await sleep(1000);
            setQuestionIndexSelected(currentIndexSelected + 1);
          }}
        />
        
      </FadeIn>
    ));
  }
};

// Exports the component
export default WebsiteCreator;
