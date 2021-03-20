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

// Creates and exports the functional component
const WebsiteCreator = () => {
  // The state variables for the screen
  const [isIntroScreenShowing, setIsIntroScreenShowing] = useState(true);
  const [isLogoTextShowing, setIsLogoTextShowing] = useState(true);
  const [isHiScreenShowing, setIsHiScreenShowing] = useState(false);
  const [isTopLogoShowing, setIsTopLogoShowing] = useState(false);
  const [isLetsGoVisible, setIsLetsGoVisible] = useState(false);

  // The useEffect method will start the animation for the logo to disappear and transition up
  useEffect(() => {
    startAnimation();
  }, []);

  // Starts the animation according to the useEffect method
  const startAnimation = async () => {
    await sleep(500);
    setIsLogoTextShowing(false);
    await sleep(2000);
    setIsHiScreenShowing(true);
    setIsIntroScreenShowing(false);
    await sleep(25);
    setIsTopLogoShowing(true);
    await sleep(7500);
    setIsLetsGoVisible(true);
  };

  if (isIntroScreenShowing) {
    // Returns the UI of the intro screen
    return (
      <div>
        <div
          className={
            isLogoTextShowing
              ? "logoTextContainer visible"
              : "logoTextContainer notVisible"
          }
        >
          <img src={EPWLogo} className={"bigLogo"} />
          <div className={"largestText blue bold"}>Easy Personal Websites</div>
          <div className={"mediumText blue"}>
            Create Your Website in 5 Minutes
          </div>
        </div>
      </div>
    );
  } else if (isHiScreenShowing) {
    return (
      <div className={"hiScreenContainer"}>
        <img
          src={EPWLogo}
          className={
            isTopLogoShowing ? "smallLogo visible" : "smallLogo notVisible"
          }
        />
        <Typist className={"typistContainer"} cursor={{ show: false }}>
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
        <div
          className={
            isLetsGoVisible ? "letsGoButton visible" : "letsGoButton notVisible"
          }
        >
          <MyButton text={"Let's Go"} isDarkMode={false} onClick={() => {}} />
        </div>
      </div>
    );
  }
};

// Exports the component
export default WebsiteCreator;
