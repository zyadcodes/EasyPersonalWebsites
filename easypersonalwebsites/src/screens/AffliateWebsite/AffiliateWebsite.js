// This is going to be the affiliate website where someone can go to create their own affiliate link
import React, { useState } from "react";
import "./AffiliateWebsite.css";
import "../../config/fontStyles.css";
import EPWLogo from "../../assets/EPW Logo.png";
import MyButton from "../../components/MyButton/MyButton";
import Modal from "react-awesome-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createAffiliateLink, logEvent } from "../../config/server";
import ReactLoading from "react-loading";

// Creates the component
const AffiliateWebsite = () => {
  // the state variables for this site
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // Attemps to create the affiliate link
  const createAffiliateLinkClient = async () => {
    if (username.trim() === "") {
      setErrorMessage("Please enter a username");
      setIsErrorVisible(true);
    } else {
      setIsLoading(true);
      const affiliateResult = await createAffiliateLink(username);
      if (affiliateResult === -1) {
        setIsLoading(false);
        setErrorMessage("This username already has an affiliate link created.");
        setIsErrorVisible(true);
      } else {
        logEvent("AffiliateCreated");
        setIsLoading(false);
        setAffiliateLink(affiliateResult);
      }
    }
  };

  return (
    <div className="affiliateContainer">
      <img src={EPWLogo} className={"smallLogo"} />
      <div className={"bigVerticalSpacer"} />
      <div className={"affiliateTinyText black"}>
        Easy Personal Websites is a website that allows freelancers and
        contractors build a simple website in less than 10 minutes. You can
        visit the website at{" "}
        <span
          className={"affiliateTinyText blue underline clickable"}
          onClick={() => openInNewTab("https://easypersonalwebsites.com")}
        >
          easypersonalwebsites.com
        </span>
        .
      </div>
      <div className={"verticalSpacer"} />
      <div className={"verticalSpacer"} />
      <div className={"verticalSpacer"} />
      <div className={"affiliateTinyText black"}>
        This is the affiliate program with Easy Personal Websites. For each
        customer that you acquire through your link, you will earn a 50%
        commision for each customer acquired, which would currently be $4. The
        link will automatically notify the developers once a customer is
        acquired. They will reach out to you over Instagram to setup the payment
        through Venmo, PayPal, or any other major payment facilitator. To get
        started, fill out the info below.
      </div>
      <div className={"bigVerticalSpacer"} />
      <div className={"smallText black"}>Enter your Instagram handle</div>
      <div className={"verticalSpacer"} />
      <div className={"instagramHandleInput"}>
        <div className={"smallText black bold"}>@</div>
        <div className={"instagramHandleSpacer"} />
        <input
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          placeholder={"zyadcodes..."}
          className={"black lightTextInput questionTextInput smallText"}
        />
      </div>
      <div className={"verticalSpacer"} />
      <div className={"verticalSpacer"} />
      {isLoading ? (
        <ReactLoading type={"spin"} color={"#0e8afc"} width={50} />
      ) : (
        <MyButton
          text={"Get Link"}
          isDarkMode={false}
          payButton={false}
          onClick={() => {
            createAffiliateLinkClient();
          }}
        />
      )}
      <div className={"verticalSpacer"} />
      <div className={"verticalSpacer"} />
      {affiliateLink ? (
        <div className={"affiliateTinyText black"}>
          Your affiliate link is{" "}
          <span
            className={"affiliateTinyText blue underline clickable"}
            onClick={() => openInNewTab(affiliateLink)}
          >
            {affiliateLink}
          </span>
          .
        </div>
      ) : null}
      <Modal
        visible={isErrorVisible}
        effect="fadeInUp"
        onClickAway={() => setIsErrorVisible(false)}
      >
        <div className={"completeAllFields"}>
          <FontAwesomeIcon
            icon={["fas", "exclamation-triangle"]}
            color={"#0e8afc"}
            size={"3x"}
          />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"smallText black"}>{errorMessage}</div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <MyButton
            payButton={false}
            text={"Ok"}
            onClick={async () => {
              setIsErrorVisible(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

// exports the component
export default AffiliateWebsite;
