// This is going to be where the personal website is going to be rendered based on the URL that is currently being displayed
import React, { useEffect, useState } from "react";
import "./PersonalWebsite.css";
import { getCustomerObject } from "../../config/server";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeIn from "react-fade-in";
import MyButton from "../../components/MyButton/MyButton";
import MetaTags from "react-meta-tags";
import Favicon from "react-favicon";
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EPWLogo from "../../assets/EPW Logo.png";
import CustomerIDs from '../../config/CustomerIDs';

// Creates the component
const PersonalWebsite = () => {
  // Stores the state of the user's data
  const [userData, setUserData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFadeInVisible, setIsFadeInVisible] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);

  // Fetches the user's data
  useEffect(() => {
    const userDomain = window.location;
    if (userDomain.hostname === "easypersonalwebsites.com") {
      const pathname = userDomain.pathname;
      // Tests to see if this is a preview site
      if (pathname.includes("expiresDate")) {
        const decodedURIParams = decodeURIComponent(pathname.substring(1));
        const parsedUserData = JSON.parse(decodedURIParams);
        if (Date.parse(parsedUserData.expiresDate) < Date.parse(new Date())) {
          setLinkExpired(true);
        } else {
          setUserData(parsedUserData);
          setIsDarkMode(parsedUserData.theme === "dark");
        }
      } else {
        fetchUserData(pathname.substring(1));
      }
    } else {
      fetchUserData(CustomerIDs[userDomain.host]);
    }
    scroll.scrollToTop();
  }, []);

  // Fetches the user's data
  const fetchUserData = async (customerID) => {
    // Uncomment below code before release
    const customerObject = await getCustomerObject(customerID);
    setUserData(customerObject);
    setIsDarkMode(customerObject.theme === "dark");
  };

  const openInNewTab = (url) => {
    let constructedURL = url;
    if (
      !constructedURL.includes("https://") &&
      !constructedURL.includes("http://")
    ) {
      constructedURL = "https://" + url;
    }
    const newWindow = window.open(
      constructedURL,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  if (linkExpired) {
    return (
      <div>
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
        <FadeIn>
          <div className={"errorContainer"}>
            <img src={EPWLogo} className={"errorLogo"} />
            <div className={"largeText blue bold"}>Oops!</div>
            <div className={"mediumText blue"}>
              This link has expired or is invalid. Reach out to me at
              zyadprofessional@gmail.com if you think this is an issue. Thanks!
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  if (userData !== "") {
    return (
      <div
        className={
          isDarkMode
            ? "personalSiteContainerDark"
            : "personalSiteContainerLight"
        }
      >
        <MetaTags>
          <title>
            {userData.firstName + " " + userData.lastName} -{" "}
            {"I " + userData.occupation.toLowerCase()}
          </title>
          <meta name="description" content={userData.occupationDescription} />
          <meta
            property="og:title"
            content={userData.firstName + " " + userData.lastName}
          />
          <meta
            property="og:image"
            content={userData.profilePictures.profileImage1}
          />
          <Favicon url={userData.profilePictures.profileImage1Blob} />
        </MetaTags>
        <div
          className={
            isDarkMode ? "topHeaderMobileDark" : "topHeaderMobileLight"
          }
        >
          <img
            src={userData.profilePictures.profileImage1}
            className={"topHeaderMobilePic"}
          />
        </div>
        <div className={"topHeaderDesktop"}>
          <div
            onClick={() => scroll.scrollTo(window.innerHeight * 0.1)}
            className={
              isDarkMode
                ? "smallText lightPurple clickable neonHover"
                : "smallText black clickable purpleHover"
            }
          >
            Intro
          </div>
          <div
            onClick={() => scroll.scrollTo(window.innerHeight * 0.7)}
            className={
              isDarkMode
                ? "smallText lightPurple clickable neonHover"
                : "smallText black clickable purpleHover"
            }
          >
            About Me
          </div>
          <div
            onClick={() => scroll.scrollTo(window.innerHeight * 1.3)}
            className={
              isDarkMode
                ? "smallText lightPurple clickable neonHover"
                : "smallText black clickable purpleHover"
            }
          >
            My Work
          </div>
          <div
            onClick={() => scroll.scrollToBottom()}
            className={
              isDarkMode
                ? "smallText lightPurple clickable neonHover"
                : "smallText black clickable purpleHover"
            }
          >
            Contact
          </div>
        </div>
        <div className={"rowIntroSection"}>
          <div className={"introContainerLeft breakWord"}>
            <div className={"introTypistContainer"}>
              <Typist
                cursor={{ show: false }}
                startDelay={1000}
                onTypingDone={() => setIsFadeInVisible(true)}
              >
                <a
                  className={
                    isDarkMode
                      ? "mediumText lightPurple bold"
                      : "mediumText black bold"
                  }
                >
                  Hello, I am{" "}
                  <span className={isDarkMode ? "neonGreen" : "blue"}>
                    {userData.firstName.charAt(0).toUpperCase()}
                    {userData.firstName.substring(1)}{" "}
                    {userData.lastName.charAt(0).toUpperCase()}
                    {userData.lastName.substring(1)}
                    {"."}
                  </span>
                </a>
                <br />
                <br />
                <Typist.Delay ms={500} />
                <a
                  className={
                    isDarkMode
                      ? "mediumText lightPurple bold"
                      : "mediumText black bold"
                  }
                >
                  I{" "}
                  <span className={isDarkMode ? "neonGreen" : "blue"}>
                    {userData.occupation.toLowerCase()}
                    {userData.occupation.charAt(
                      userData.occupation.length - 1
                    ) === "."
                      ? ""
                      : "."}
                  </span>
                </a>
              </Typist>
            </div>
            <FadeIn visible={isFadeInVisible} transitionDuration={1000}>
              <div className={"centerAlignContainer"}>
                <div
                  className={
                    isDarkMode ? "smallText lightPurple" : "smallText black"
                  }
                >
                  {userData.occupationDescription}
                </div>
                <div className={"verticalSpacer"} />
                <div className={"verticalSpacer"} />
                <div className={"verticalSpacer"} />
                <MyButton
                  text={"Learn More"}
                  isDarkMode={isDarkMode}
                  onClick={() => {
                    scroll.scrollTo(window.innerHeight * 0.7);
                  }}
                />
              </div>
            </FadeIn>
          </div>
          <div className={"imageShadowContainer"}>
            <img
              src={userData.profilePictures.profileImage1}
              className={"profileImage1Style"}
            />
            <img
              src={userData.profilePictures.profileImage1}
              className={"profileImage1ShadowStyle"}
            />
          </div>
        </div>
        <div
          className={
            isDarkMode ? "aboutMeRowDarkDesktop" : "aboutMeRowLightDesktop"
          }
        >
          <div
            className={
              isDarkMode
                ? "profilePic2ContainerDark"
                : "profilePic2ContainerLight"
            }
          >
            <img
              src={userData.profilePictures.profileImage2}
              className={"profilePic2Style"}
            />
          </div>
          <div className={"aboutMeContainer"}>
            <div
              className={
                isDarkMode
                  ? "mediumText lightPurple bold"
                  : "mediumText black bold"
              }
            >
              About{" "}
              <span className={isDarkMode ? "neonGreen" : "blue"}>Me</span>
            </div>
            <div className={"verticalSpacer"} />
            <div
              className={
                isDarkMode ? "smallText lightPurple" : "smallText black"
              }
            >
              {userData.aboutMe}
            </div>
            <div className={"verticalSpacer"} />
            <div className={"verticalSpacer"} />
            <div className={"centerAlignContainer"}>
              <MyButton
                onClick={() => {
                  scroll.scrollTo(window.innerHeight * 1.4);
                }}
                isDarkMode={isDarkMode}
                text={"My Work"}
              />
            </div>
            <div className={"verticalSpacer"} />
          </div>
        </div>
        <div
          className={
            isDarkMode ? "aboutMeRowDarkMobile" : "aboutMeRowLightMobile"
          }
        >
          <div
            className={
              isDarkMode
                ? "mediumText lightPurple bold"
                : "mediumText black bold"
            }
          >
            About <span className={isDarkMode ? "neonGreen" : "blue"}>Me</span>
          </div>
          <div>
            <div className={"aboutMeContainer"}>
              <div
                className={
                  isDarkMode
                    ? "profilePic2ContainerDark"
                    : "profilePic2ContainerLight"
                }
              >
                <img
                  src={userData.profilePictures.profileImage2}
                  className={"profilePic2Style"}
                />
              </div>
              <div
                className={
                  isDarkMode ? "smallText lightPurple" : "smallText black"
                }
              >
                {userData.aboutMe}
              </div>
            </div>
            <div className={"verticalSpacer"} />
            <div className={"verticalSpacer"} />
            <div className={"centerAlignContainer"}>
              <MyButton
                onClick={() => {
                  scroll.scrollTo(window.innerHeight * 1.4);
                }}
                isDarkMode={isDarkMode}
                text={"My Work"}
              />
            </div>
            <div className={"verticalSpacer"} />
          </div>
        </div>
        <div
          className={
            isDarkMode ? "myWorkContainerDark" : "myWorkContainerLight"
          }
        >
          <div className={"verticalSpacer"} />
          <div
            className={
              isDarkMode
                ? "mediumText lightPurple bold"
                : "mediumText black bold"
            }
          >
            Some of My{" "}
            <span className={isDarkMode ? "neonGreen" : "blue"}>Work</span>
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"workImagesContainer"}>
            {Object.keys(userData.workPictures).map((eachWork) => {
              const workObject = userData.workPictures[eachWork];
              return (
                <div>
                  <div
                    className={
                      isDarkMode
                        ? "singleWorkImageContainer darkBackgroundColor"
                        : "singleWorkImageContainer"
                    }
                  >
                    <img src={workObject.image} className={"workImage"} />
                    <div
                      className={
                        isDarkMode
                          ? "workImageOverlay darkBackgroundColor"
                          : "workImageOverlay"
                      }
                    >
                      <div className={"smallText white bold"}>
                        {workObject.title}
                      </div>
                      <div className={"verticalSpacer"} />
                      <div className={"smallText black bold"}>
                        {workObject.description}
                      </div>
                    </div>
                  </div>
                  <div className={"workPictureDescription"}>
                    <div
                      className={
                        isDarkMode
                          ? "smallText neonGreen bold"
                          : "smallText blue bold"
                      }
                    >
                      {workObject.title}
                    </div>
                    <div className={"smallVerticalSpacer"} />
                    <div className={"smallVerticalSpacer"} />
                    <div
                      className={
                        isDarkMode
                          ? "smallText lightPurple bold"
                          : "smallText black bold"
                      }
                    >
                      {workObject.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <MyButton
            onClick={() => {
              scroll.scrollToBottom();
            }}
            text={"Let's Talk"}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className={isDarkMode ? "footerDark" : "footerLight"}>
          <div className={"footerLeft"}>
            <div
              className={
                isDarkMode
                  ? "mediumText lightPurple bold"
                  : "mediumText black bold"
              }
            >
              Let's{" "}
              <span className={isDarkMode ? "neonGreen" : "blue"}>Talk</span>
            </div>
            <div className={"contactRowMobile"}>
              <a
                className={
                  isDarkMode
                    ? "tinyText lightPurple bold"
                    : "tinyText black bold"
                }
                href={"mailto:" + userData.emailAddress}
              >
                <FontAwesomeIcon
                  icon={["fas", "envelope"]}
                  color={isDarkMode ? "#ccd7f6" : "#000000"}
                  size={"3x"}
                />
              </a>
              <a
                className={
                  isDarkMode
                    ? "tinyText lightPurple bold"
                    : "tinyText black bold"
                }
                href={"tel:" + userData.phoneNumber}
              >
                <FontAwesomeIcon
                  icon={["fas", "phone"]}
                  color={isDarkMode ? "#ccd7f6" : "#000000"}
                  size={"3x"}
                />
              </a>
            </div>
            <div className={"contactRowDesktop"}>
              <FontAwesomeIcon
                icon={["fas", "envelope"]}
                color={isDarkMode ? "#ccd7f6" : "#000000"}
                size={"2x"}
              />
              <div className={"horizontalSpacer"} />
              <a
                className={
                  isDarkMode
                    ? "tinyText lightPurple bold"
                    : "tinyText black bold"
                }
                href={"mailto:" + userData.emailAddress}
              >
                {userData.emailAddress}
              </a>
            </div>
            <div className={"contactRowDesktop"}>
              <FontAwesomeIcon
                icon={["fas", "phone"]}
                color={isDarkMode ? "#ccd7f6" : "#000000"}
                size={"2x"}
              />
              <div className={"horizontalSpacer"} />
              <a
                className={
                  isDarkMode
                    ? "tinyText lightPurple bold"
                    : "tinyText black bold"
                }
                href={"tel:" + userData.phoneNumber}
              >
                {userData.phoneNumber}
              </a>
            </div>
          </div>
          <div className={"footerRight"}>
            {Object.keys(userData.socialMedias).map((eachMedia) => {
              const theMedia = userData.socialMedias[eachMedia];
              if (theMedia) {
                return (
                  <div>
                    <div
                      className={"clickable mediaDesktop"}
                      onClick={() => openInNewTab(theMedia)}
                    >
                      <FontAwesomeIcon
                        icon={["fab", eachMedia]}
                        color={isDarkMode ? "#ccd7f6" : "#000000"}
                        size={"3x"}
                      />
                    </div>
                    <div
                      className={"clickable mediaMobile"}
                      onClick={() => openInNewTab(theMedia)}
                    >
                      <FontAwesomeIcon
                        icon={["fab", eachMedia]}
                        color={isDarkMode ? "#ccd7f6" : "#000000"}
                        size={"2x"}
                      />
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

// Exports the component
export default PersonalWebsite;