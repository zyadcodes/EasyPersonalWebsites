// This is going to export the array of questions that will be used to build the user website
import React from "react";
import "./fontStyles.css";
import "../screens/WebsiteCreator/Question.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));

export default [
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What’s your <span className={"blue"}>first name?</span>
      </div>
    ),
    questionSubtitle: "Help us get to know you.",
    objectName: "firstName",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"mediumText black bold"}>My first name is </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"John..."}
          className={"questionTextInput black mediumText"}
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What’s your <span className={"blue"}>last name?</span>
      </div>
    ),
    questionSubtitle: "Help us get to know you.",
    objectName: "lastName",
    questionTextInput: (inputFunc, inputValue) => {
      return (
        <div className={"questionTextInputContainer"}>
          <div className={"mediumText black bold"}>My last name is </div>
          <div className={"questionSpacer"} />
          <input
            onChange={(event) => inputFunc(event.target.value)}
            value={inputValue ? inputValue : ""}
            placeholder={"Smith..."}
            className={"questionTextInput black mediumText"}
          />
        </div>
      );
    },
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What do you <span className={"blue"}>do?</span>
      </div>
    ),
    questionSubtitle: "Tell us what you want people to know you do.",
    objectName: "occupation",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"mediumText black bold"}>I </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"make websites..."}
          className={"questionTextInput black mediumText questionTextInputWide"}
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What would you <span className={"blue"}>call yourself?</span>
      </div>
    ),
    questionSubtitle: "Tell us what someone would say you are.",
    objectName: "title",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"mediumText black bold"}>I am a(n) </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"influencer..."}
          className={"questionTextInput black mediumText"}
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        How would you describe <span className={"blue"}>what you do?</span>
      </div>
    ),
    questionSubtitle:
      "Give us a brief description about what someone say you do.",
    objectName: "occupationDescription",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"What you do..."}
          className={
            "questionTextInput black mediumText questionTextInputUltraWide"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        How would you <span className={"blue"}>describe yourself?</span>
      </div>
    ),
    questionSubtitle: "Tell us a little about yourself.",
    objectName: "aboutMe",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"About you..."}
          className={
            "questionTextInput black mediumText questionTextInputUltraWide"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What do you <span className={"blue"}>you look like?</span>
      </div>
    ),
    questionSubtitle: "Show people what you look like.",
    objectName: "profilePictures",
    questionImagesInput: (inputFunc, inputValue) => (
      <div>
        <div className={"profileImagesContainer"}>
          <div className={"profileImageUpload"}>
            <div className={"imageOverlay smallText white bold"}>
              Choose Image
            </div>
            <FontAwesomeIcon
              icon={["fas", "user"]}
              color={"#ffffff"}
              size={"5x"}
            />
            <input
              className={"fileUploadInput"}
              type="file"
              name="myImage"
              accept="image/*"
              onChange={async (event) => {}}
            />
          </div>
          <div className={"profileImageUpload"}>
            <div className={"imageOverlay smallText white bold"}>
              Choose Image
            </div>
            <FontAwesomeIcon
              icon={["fas", "user"]}
              color={"#ffffff"}
              size={"5x"}
            />
            <input
              className={"fileUploadInput"}
              type="file"
              name="myImage"
              accept="image/*"
              onChange={(event) => {
                console.log(event.target.files);
              }}
            />
          </div>
        </div>
        <div className={"minText tinyText gray"}>
          Try to upload high quality images (At least 1024px x 1024px)
        </div>
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What does your <span className={"blue"}>work look like?</span>
      </div>
    ),
    questionSubtitle: "Show off your work to everyone.",
    objectName: "workPictures",
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        Which <span className={"blue"}>theme</span> do you like more?
      </div>
    ),
    questionSubtitle: "Tell us whether you like the light or dark theme.",
    objectName: "theme",
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What's your <span className={"blue"}>email address?</span>
      </div>
    ),
    questionSubtitle: "Tell us how people will contact you.",
    objectName: "emailAddress",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"mediumText black bold"}>My email is </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"johnsmith@gmail.com..."}
          className={
            "questionTextInput black mediumText questionTextInputUltraWide"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What's your <span className={"blue"}>phone number?</span>
      </div>
    ),
    questionSubtitle: "Tell us how people will contact you.",
    objectName: "phoneNumber",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"mediumText black bold"}>My phone number is </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"(425) 111-1111..."}
          className={"questionTextInput black mediumText questionTextInputWide"}
        />
      </div>
    ),
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What are your <span className={"blue"}>social medias?</span>
      </div>
    ),
    questionSubtitle: "Tell us how people can discover you.",
    objectName: "socialMedias",
  },
  {
    questionTitle: (
      <div className={"largerText black bold"}>
        What <span className={"blue"}>domain name</span> would you like?
      </div>
    ),
    questionSubtitle: "This is what people will type in to get to your site.",
    objectName: "domainName",
    questionTextInput: (inputFunc, inputValue) => (
      <div className={"questionTextInputContainer"}>
        <div className={"mediumText black bold"}>I want the domain </div>
        <div className={"questionSpacer"}></div>
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"johnsmith.com..."}
          className={"questionTextInput black mediumText questionTextInputWide"}
        />
      </div>
    ),
    buttonText: "Pay",
  },
];
