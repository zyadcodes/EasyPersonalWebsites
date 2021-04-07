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
import CheckoutForm from "./CheckoutForm";
import { checkInput } from "../../config/checkInput";
import Modal from "react-awesome-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import ReactStars from "react-stars";
import { submitRating, logEvent } from "../../config/server";
import MetaTags from "react-meta-tags";
import Favicon from "react-favicon";

// Creates and exports the functional component
const WebsiteCreator = () => {
  // The state variables for the screen
  const [isIntroScreenShowing, setIsIntroScreenShowing] = useState(true);
  const [isLogoTextShowing, setIsLogoTextShowing] = useState(true);
  const [isHiScreenShowing, setIsHiScreenShowing] = useState(false);
  const [isHiDivShowing, setIsHiDivShowing] = useState(true);
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isCheckoutDivShowing, setIsCheckoutDivShowing] = useState(false);
  const [isCreatingSiteVisible, setIsCreatingSiteVisible] = useState(false);
  const [isCreatingSiteDivVisible, setIsCreatingSiteDivVisible] = useState(
    false
  );
  const [isWebsiteDoneVisible, setIsWebsiteDoneVisible] = useState(false);
  const [isWebsiteDoneDivVisible, setIsWebsiteDoneDivVisible] = useState(true);
  const [questionIndexSelected, setQuestionIndexSelected] = useState(0);
  const [barIndexSelected, setBarIndexSelected] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);
  const [userInput, setUserInput] = useState({
    theme: "light",
    socialMedias: {
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      pinterest: "",
      tiktok: "",
    },
  });
  const [isIncompleteVisible, setIsIncompleteVisible] = useState(false);
  const [fieldsIncomplete, setFieldsIncomplete] = useState([]);
  const [isStarsVisible, setIsStarsVisible] = useState(true);
  const [isRatedVisible, setIsRatedVisible] = useState(false);

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
    logEvent("UserFlowStart", {});
  };

  // This is going to check to make sure every single field has been correctly filled out, then navigates to
  // the next screen if they have
  const checkFields = async () => {
    const incompleteFields = checkInput(userInput);
    if (incompleteFields.length > 0) {
      setFieldsIncomplete(incompleteFields);
      setIsIncompleteVisible(true);
    } else {
      setIsQuestionVisible(false);
      await sleep(400);
      setIsCheckoutVisible(true);
      setIsQuestionsVisible(false);
      setIsCheckoutDivShowing(true);
      logEvent("UserFlowComplete", {});
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // Stores the metatags for the site
  const metaTags = (
    <MetaTags>
      <title>Easy Personal Websites - Create a website in 5 minutes</title>
      <meta
        name="description"
        content="Create a simple personal website in 5 minutes. We give heroes like you peace of mind when it comes to having a website so you can do what you do while we do the rest. We’ll do everything for you— relax and leave the details to us."
      />
      <meta property="og:title" content="Easy Personal Websites" />
      <meta property="og:image" content={EPWLogo} />
      <Favicon url={EPWLogo} />
    </MetaTags>
  );

  if (isIntroScreenShowing) {
    // Returns the UI of the intro screen
    return (
      <div>
        {metaTags}
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
        {metaTags}
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
                  setIsQuestionsVisible(true);
                  setIsHiScreenShowing(false);
                }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={9300} className={"createdWebsiteMessage"}>
            <div className={"tinyText gray"}>
              If you’ve created a website with me and would like to edit or
              remove your website, please reach out to me at
              zyadprofessional@gmail.com.
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    );
  } else if (isQuestionsVisible) {
    return (
      <div className={"allQuestionsContainer" + " " + userInput.theme}>
        {metaTags}
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
                barIndexSelected === index
                  ? "step selected bar" + userInput.theme
                  : "step unselected bar"
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
            goToPayment={async () => {
              // Checks to make sure all fields have been filled out and then navigates to the next page
              checkFields();
            }}
            domainName={userInput.domainName ? userInput.domainName : ""}
          />
        </FadeIn>
        <Modal
          visible={isIncompleteVisible}
          effect="fadeInUp"
          onClickAway={() => setIsIncompleteVisible(false)}
        >
          <div className={"fieldsModal"}>
            <FontAwesomeIcon
              icon={["fas", "exclamation-triangle"]}
              color={"#0e8afc"}
              size={"3x"}
            />
            <div className={"verticalSpacer"} />
            <div className={"smallText black"}>
              You have some incomplete fields
            </div>
            {fieldsIncomplete.map((eachField) => (
              <div>
                <div className={"verticalSpacer"} />
                <div
                  className={"tinyText blue underline bold clickable"}
                  key={eachField.index}
                  onClick={async () => {
                    setIsIncompleteVisible(false);
                    setIsQuestionVisible(false);
                    setBarIndexSelected(eachField.index);
                    await sleep(400);
                    setQuestionIndexSelected(eachField.index);
                    setIsQuestionVisible(true);
                  }}
                >
                  {eachField.name}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  } else if (isCheckoutVisible) {
    return (
      <FadeIn visible={isCheckoutDivShowing}>
        {metaTags}
        <div className={"paymentPageContainer"}>
          <div className={"backButtonContainer"}>
            <MyButton
              backButton={true}
              isDarkMode={false}
              onClick={async () => {
                setIsQuestionsVisible(true);
                setIsQuestionVisible(true);
              }}
            />
          </div>
          <CheckoutForm
            userInput={userInput}
            processTransaction={async () => {
              setIsCreatingSiteVisible(true);
              setIsCheckoutDivShowing(false);
              await sleep(400);
              setIsCheckoutVisible(false);
              setIsCreatingSiteDivVisible(true);
              logEvent("CustomerAcquiredAttempt", {});
            }}
            completeCheckout={async () => {
              await sleep(2000);
              setIsWebsiteDoneVisible(true);
              setIsCreatingSiteDivVisible(false);
              await sleep(400);
              setIsCreatingSiteVisible(false);
              setIsWebsiteDoneDivVisible(true);
              logEvent("CustomerAcquiredSuccess", {});
            }}
          />
        </div>
      </FadeIn>
    );
  } else if (isCreatingSiteVisible) {
    return (
      <FadeIn visible={isCreatingSiteDivVisible}>
        {metaTags}
        <div
          className={
            userInput.theme === "light"
              ? "lightCreatingSite"
              : "darkCreatingSite"
          }
        >
          <ReactLoading
            type={"cubes"}
            color={userInput.theme === "light" ? "#0e8afc" : "#64ffda"}
            width={150}
          />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div
            className={
              userInput.theme === "light"
                ? "mediumText bold blue"
                : "mediumText bold neonGreen"
            }
          >
            Creating your website...
          </div>
        </div>
      </FadeIn>
    );
  } else if (isWebsiteDoneVisible) {
    return (
      <FadeIn visible={isWebsiteDoneDivVisible}>
        {metaTags}
        <div
          className={
            userInput.theme === "dark"
              ? "websiteCreatedContainer darkContainer"
              : "websiteCreatedContainer"
          }
        >
          <img src={EPWLogo} className={"smallLogo"} />
          <Typist
            className={"typistContainer"}
            cursor={{ show: false }}
            startDelay={550}
          >
            <a
              className={
                userInput.theme === "dark"
                  ? "largeText lightPurple bold"
                  : "largeText black bold"
              }
            >
              Congratulations on your new{" "}
              <span
                className={userInput.theme === "dark" ? "neonGreen" : "blue"}
              >
                website!
              </span>
            </a>
          </Typist>
          <FadeIn visible={true} delay={3500}>
            <div className={"temporaryWebsiteContainer"}>
              <div
                className={
                  userInput.theme === "dark"
                    ? "mediumText lightPurple bold"
                    : "mediumText black bold"
                }
              >
                Your temporary website is
                {<br />}
                <span
                  className={
                    userInput.theme === "dark"
                      ? "mediumText neonGreen bold clickable underline"
                      : "mediumText blue bold clickable underline"
                  }
                  onClick={() => {
                    openInNewTab(
                      "easypersonalwebsites.com/" + userInput.domainName
                    );
                  }}
                >
                  easypersonalwebsites.com/
                  {userInput.domainName}
                </span>
              </div>
              <div className={"verticalSpacer"} />
              <div className={"verticalSpacer"} />
              <div className={"verticalSpacer"} />
              <div
                className={
                  userInput.theme === "dark"
                    ? "smallText lightPurple"
                    : "smallText black"
                }
              >
                We will spend the next 2-3 days connecting your website to
                {" " + userInput.domainName}. This process is automatic and
                you’ll be sent an email when your domain is activated.
              </div>
              <div className={"verticalSpacer"} />
              <div className={"verticalSpacer"} />
              <div className={"verticalSpacer"} />
              {isStarsVisible ? (
                <FadeIn
                  visible={isStarsVisible}
                  className={"centerAlignContainer"}
                >
                  <div
                    className={
                      userInput.theme === "dark"
                        ? "mediumText lightPurple bold"
                        : "mediumText black bold"
                    }
                  >
                    How{" "}
                    <span
                      className={
                        userInput.theme === "dark" ? "neonGreen" : "blue"
                      }
                    >
                      simple
                    </span>{" "}
                    would you rate that process?
                  </div>
                  <div className={"verticalSpacer"} />
                  <ReactStars
                    count={5}
                    color2={"#FED22C"}
                    onChange={async (newRating) => {
                      setIsRatedVisible(true);
                      setIsStarsVisible(false);
                      await sleep(2000);
                      setIsRatedVisible(false);
                      submitRating(userInput.domainName, newRating);
                      logEvent("RatingSubmitted", { newRating });
                    }}
                    size={75}
                  />
                </FadeIn>
              ) : null}
            </div>
          </FadeIn>
        </div>
        <Modal visible={isRatedVisible} effect="fadeInUp">
          <div className={"feedbackModal"}>
            <div className={"smallText black bold"}>
              Thank you for your feedback
              {<br />}
              {<br />}- Zyad
            </div>
          </div>
        </Modal>
      </FadeIn>
    );
  }
};

// Exports the component
export default WebsiteCreator;
