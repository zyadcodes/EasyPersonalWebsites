// This is going to be the button component for the website
import React from "react";
import "./MyButton.css";
import "../../config/fontStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Declares the component
const MyButton = ({
  text,
  onClick,
  isDarkMode,
  payButton,
  backButton,
  disabled,
}) => {
  // Defines the style of the button
  let className = "myButtonContainer white";
  if (isDarkMode) {
    className += " darkButton";
  }
  if (payButton) {
    className += " tinyText payButtonContainer";
  } else {
    className += " smallText";
  }

  // Returns the component
  return (
    <button
      className={backButton ? "backButton" : className}
      onClick={() => onClick()}
      disabled={disabled ? disabled : false}
    >
      {payButton ? (
        <FontAwesomeIcon icon={["fas", "lock"]} color={"#ffffff"} size={"2x"} />
      ) : null}
      {backButton ? (
        <FontAwesomeIcon
          icon={["fas", "arrow-left"]}
          color={"#ffffff"}
          size={"2x"}
        />
      ) : (
        <div className={"horizonatalPaySpacer"} />
      )}

      {text}
    </button>
  );
};

// Exports the component
export default MyButton;
