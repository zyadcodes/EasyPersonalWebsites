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
  const [isStarsVisible, setIsStarsVisible] = useState(true);
  const [isRatedVisible, setIsRatedVisible] = useState(false);
  const [customerID, setCustomerID] = useState("");
  const [hostingMessageVisible, setHostingMessageVisible] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState("");

  // The useEffect method will start the animation for the logo to disappear and transition up
  useEffect(() => {
    startAnimation();
    // Sets the affiliate if there is one
    const currentURL = window.location.pathname;
    if (currentURL.includes("/affiliateLink=")) {
      setAffiliateLink(currentURL.substring(15));
    }
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
  console.log(affiliateLink);
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
      <FadeIn
        className={"hiScreenContainer"}
        visible={isHiDivShowing}
        delay={100}
      >
        {metaTags}
        <img src={EPWLogo} className={"smallLogo"} />
        <div className={"typistContainer"}>
          <div className={"largestText black bold"}>
            Hi, my name is <span className={"blue"}>Zyad.</span>
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"largestText black bold"}>
            I <span className={"blue"}>build websites.</span>
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"largestText black bold"}>
            Let me help you build <span className={"blue"}>yours.</span>
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"largestText black bold"}>
            It'll take <span className={"blue"}>five</span> minutes.
          </div>
        </div>
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
        <div className={"createdWebsiteMessage"}>
          <div className={"tinyText gray"}>
            If you’ve created a website with me and would like to edit or remove
            your website, please reach out to me at zyadprofessional@gmail.com.
          </div>
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
                // Navigates the clicked step if all steps before it have been completed
                let canBeNavigatedTo = true;
                for (let i = 0; i < index; i++) {
                  if (
                    !QuestionsArray[i].isCompleted(
                      userInput[QuestionsArray[i].objectName]
                    )
                  ) {
                    canBeNavigatedTo = false;
                  }
                }
                if (canBeNavigatedTo) {
                  if (barIndexSelected !== index) {
                    setIsQuestionVisible(false);
                    setBarIndexSelected(index);
                    await sleep(400);
                    setQuestionIndexSelected(index);
                    setIsQuestionVisible(true);
                  }
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
              setHostingMessageVisible(true);
            }}
          />
        </FadeIn>
        <Modal
          visible={hostingMessageVisible}
          effect="fadeInUp"
          onClickAway={() => setHostingMessageVisible(false)}
        >
          <div className={"completeAllFields"}>
            <FontAwesomeIcon
              icon={["fas", "check"]}
              color={"#0e8afc"}
              size={"3x"}
            />
            <div className={"verticalSpacer"} />
            <div className={"verticalSpacer"} />
            <div className={"tinyText black"}>
              By the way, you'll also get your own domain name, like
              JohnSmith.com! Once you complete your payment, I'll reach out to
              you so you can pick from available domains!
            </div>
            <div className={"verticalSpacer"} />
            <div className={"verticalSpacer"} />
            <MyButton
              payButton={false}
              text={"Continue"}
              onClick={async () => {
                setHostingMessageVisible(false);
                setIsQuestionVisible(false);
                await sleep(400);
                setIsCheckoutVisible(true);
                setIsQuestionsVisible(false);
                setIsCheckoutDivShowing(true);
                logEvent("UserFlowComplete", {});
              }}
            />
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
            affiliateLink={affiliateLink}
            processTransaction={async () => {
              setIsCreatingSiteVisible(true);
              setIsCheckoutDivShowing(false);
              await sleep(400);
              setIsCheckoutVisible(false);
              setIsCreatingSiteDivVisible(true);
              logEvent("CustomerAcquiredAttempt", {});
            }}
            completeCheckout={async (customerID) => {
              await sleep(2000);
              setCustomerID(customerID);
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
                      "https://easypersonalwebsites.com/" + customerID
                    );
                  }}
                >
                  easypersonalwebsites.com/
                  {customerID}
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
                Your plan comes with unlimited domain hosting. I will personally
                reach out to you within 24 hours to register your domain. Keep
                checking your email!
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
                      submitRating(customerID, newRating);
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
