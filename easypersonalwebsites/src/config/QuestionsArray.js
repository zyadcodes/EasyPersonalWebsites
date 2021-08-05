// This is going to export the array of questions that will be used to build the user website
import React from "react";
import "./fontStyles.css";
import "../screens/WebsiteCreator/Question.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default [
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What’s your{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          first name?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Help us get to know you.
      </div>
    ),
    objectName: "firstName",
    isCompleted: (inputValue) => inputValue && inputValue.trim().length > 0,
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"questionTextInputContainer"}>
        <div
          className={
            theme === "light"
              ? "mediumText black bold"
              : "mediumText lightPurple bold"
          }
        >
          My first name is{" "}
        </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"John..."}
          className={
            "black " + theme + "TextInput questionTextInput mediumText"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What’s your{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          last name?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Help us get to know you.
      </div>
    ),
    objectName: "lastName",
    isCompleted: (inputValue) => inputValue && inputValue.trim().length > 0,
    questionInput: (inputFunc, inputValue, theme) => {
      return (
        <div className={"questionTextInputContainer"}>
          <div
            className={
              theme === "light"
                ? "mediumText black bold"
                : "mediumText lightPurple bold"
            }
          >
            My last name is{" "}
          </div>
          <div className={"questionSpacer"} />
          <input
            onChange={(event) => inputFunc(event.target.value)}
            value={inputValue ? inputValue : ""}
            placeholder={"Smith..."}
            className={
              "black " + theme + "TextInput questionTextInput mediumText"
            }
          />
        </div>
      );
    },
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What do you{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>do?</span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us what you want people to know you do.
      </div>
    ),
    objectName: "occupation",
    isCompleted: (inputValue) => inputValue && inputValue.trim().length > 0,
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"questionTextInputContainer"}>
        <div
          className={
            theme === "light"
              ? "mediumText black bold"
              : "mediumText lightPurple bold"
          }
        >
          I{" "}
        </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"make websites..."}
          className={
            "black " +
            theme +
            "TextInput questionTextInput mediumText questionTextInputWide"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What would you{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          call yourself?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us what someone would say you are.
      </div>
    ),
    objectName: "title",
    isCompleted: (inputValue) => inputValue && inputValue.trim().length > 0,
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"questionTextInputContainer"}>
        <div
          className={
            theme === "light"
              ? "mediumText black bold"
              : "mediumText lightPurple bold"
          }
        >
          I am a(n){" "}
        </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"influencer..."}
          className={
            "black " + theme + "TextInput questionTextInput mediumText"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        How would you describe{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          what you do?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        {" "}
        Give us a brief description about what someone say you do.
      </div>
    ),
    objectName: "occupationDescription",
    isCompleted: (inputValue) =>
      inputValue &&
      inputValue.trim().length > 119 &&
      inputValue.trim().length < 181,
    questionInput: (inputFunc, inputValue, theme) => {
      return (
        <div>
          <div className={"questionTextInputContainer"}>
            <div className={"questionSpacer"} />
            <input
              maxLength={180}
              onChange={(event) => inputFunc(event.target.value)}
              value={inputValue ? inputValue : ""}
              placeholder={"What you do..."}
              className={
                "black " +
                theme +
                "TextInput questionTextInput mediumText questionTextInputUltraWide"
              }
            />
          </div>
          <div className={"minCharactersContainer tinyText gray"}>
            {inputValue
              ? inputValue.length <= 120
                ? "Min characters: " + (120 - inputValue.length)
                : "Max characters: " + (180 - inputValue.length)
              : "Min characters: 120"}
          </div>
        </div>
      );
    },
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        How would you{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          describe yourself?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us a little about yourself.
      </div>
    ),
    objectName: "aboutMe",
    isCompleted: (inputValue) =>
      inputValue &&
      inputValue.trim().length > 239 &&
      inputValue.trim().length < 301,
    questionInput: (inputFunc, inputValue, theme) => (
      <div>
        <div className={"questionTextInputContainer"}>
          <div className={"questionSpacer"} />
          <input
            maxLength={300}
            onChange={(event) => inputFunc(event.target.value)}
            value={inputValue ? inputValue : ""}
            placeholder={"About you..."}
            className={
              "black " +
              theme +
              "TextInput questionTextInput mediumText questionTextInputUltraWide"
            }
          />
        </div>
        <div className={"minCharactersContainer tinyText gray"}>
          {inputValue
            ? inputValue.length <= 240
              ? "Min characters: " + (240 - inputValue.length)
              : "Max characters: " + (300 - inputValue.length)
            : "Min characters: 240"}
        </div>
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What do you{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          you look like?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Show people what you look like.
      </div>
    ),
    objectName: "profilePictures",
    isCompleted: (inputValue) =>
      inputValue &&
      inputValue.profileImage1 !== "" &&
      inputValue.profileImage2 !== "",
    questionInput: (inputFunc, inputValue, theme) => (
      <div>
        <div className={"doubleRowContainer"}>
          <div
            className={
              theme === "dark"
                ? "profileImageUpload darkBackgroundColor"
                : "profileImageUpload"
            }
          >
            {inputValue && inputValue.profileImage1 ? (
              <img
                src={inputValue.profileImage1}
                className={"profileImagePreview"}
              />
            ) : (
              <div>
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  color={"#ffffff"}
                  size={"5x"}
                />
              </div>
            )}
            <div
              className={
                theme === "dark"
                  ? "imageOverlay smallText white bold darkBackgroundColor"
                  : "imageOverlay smallText white bold"
              }
            >
              Choose Image
            </div>
            <input
              className={"fileUploadInput"}
              type="file"
              name="myImage"
              accept="image/*"
              onChange={async (event) => {
                inputFunc({
                  profileImage1: URL.createObjectURL(event.target.files[0]),
                  profileImage2: inputValue ? inputValue.profileImage2 : "",
                });
              }}
            />
          </div>
          <div className={"imageSpacer"} />
          <div
            className={
              theme === "dark"
                ? "profileImageUpload darkBackgroundColor"
                : "profileImageUpload"
            }
          >
            {inputValue && inputValue.profileImage2 ? (
              <img
                src={inputValue.profileImage2}
                className={"profileImagePreview"}
              />
            ) : (
              <div>
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  color={"#ffffff"}
                  size={"5x"}
                />
              </div>
            )}
            <div
              className={
                theme === "dark"
                  ? "imageOverlay smallText white bold darkBackgroundColor"
                  : "imageOverlay smallText white bold"
              }
            >
              Choose Image
            </div>
            <input
              className={"fileUploadInput"}
              type="file"
              name="myImage"
              accept="image/*"
              onChange={(event) => {
                inputFunc({
                  profileImage1: inputValue ? inputValue.profileImage1 : "",
                  profileImage2: URL.createObjectURL(event.target.files[0]),
                });
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
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What does your{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          work look like?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Show off your work to everyone.
      </div>
    ),
    objectName: "workPictures",
    isCompleted: (inputValue) =>
      inputValue &&
      inputValue.work1.image !== "" &&
      inputValue.work2.image !== "" &&
      inputValue.work3.image !== "" &&
      inputValue.work1.title.trim().length > 2 &&
      inputValue.work1.title.trim().length < 21 &&
      inputValue.work2.title.trim().length > 2 &&
      inputValue.work2.title.trim().length < 21 &&
      inputValue.work3.title.trim().length > 2 &&
      inputValue.work3.title.trim().length < 21 &&
      inputValue.work1.description.trim().length > 9 &&
      inputValue.work1.description.trim().length < 31 &&
      inputValue.work2.description.trim().length > 9 &&
      inputValue.work2.description.trim().length < 31 &&
      inputValue.work3.description.trim().length > 9 &&
      inputValue.work3.description.trim().length < 31,
    questionInput: (inputFunc, inputValue, theme) => (
      <div>
        <div className={"workRowContainer"}>
          <div className={"workInformationContainer"}>
            <div
              className={
                theme === "dark"
                  ? "profileImageUpload darkBackgroundColor"
                  : "profileImageUpload"
              }
            >
              {inputValue && inputValue.work1.image ? (
                <img
                  src={inputValue.work1.image}
                  className={"profileImagePreview"}
                />
              ) : (
                <div>
                  <FontAwesomeIcon
                    icon={["fas", "camera"]}
                    color={"#ffffff"}
                    size={"5x"}
                  />
                </div>
              )}
              <div
                className={
                  theme === "dark"
                    ? "imageOverlay smallText white bold darkBackgroundColor"
                    : "imageOverlay smallText white bold"
                }
              >
                Choose Image
              </div>
              <input
                className={"fileUploadInput"}
                type="file"
                name="myImage"
                accept="image/*"
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: URL.createObjectURL(event.target.files[0]),
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
              />
            </div>
            <div className={"workTitleDescriptionContainer"}>
              <input
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: event.target.value,
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
                maxLength={20}
                value={inputValue ? inputValue.work1.title : ""}
                placeholder={"Title..."}
                className={
                  "black " +
                  theme +
                  "TextInput questionTextInput questionTextInputSmall black tinyText"
                }
              />
              <div className={"workMinCharacters tinyText gray"}>
                {inputValue
                  ? inputValue.work1.title.length <= 3
                    ? "Min characters: " + (3 - inputValue.work1.title.length)
                    : "Max characters: " + (20 - inputValue.work1.title.length)
                  : "Min characters: 3"}
              </div>
              <div className={"verticalSpacer"} />
              <input
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: event.target.value,
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
                maxLength={30}
                value={inputValue ? inputValue.work1.description : ""}
                placeholder={"Description..."}
                className={
                  "black " +
                  theme +
                  "TextInput questionTextInput questionTextInputSmall black tinyText"
                }
              />
              <div className={"workMinCharacters tinyText gray"}>
                {inputValue
                  ? inputValue.work1.description.length <= 10
                    ? "Min characters: " +
                      (10 - inputValue.work1.description.length)
                    : "Max characters: " +
                      (30 - inputValue.work1.description.length)
                  : "Min characters: 10"}
              </div>
            </div>
          </div>
          <div className={"workInformationContainer"}>
            <div
              className={
                theme === "dark"
                  ? "profileImageUpload darkBackgroundColor"
                  : "profileImageUpload"
              }
            >
              {inputValue && inputValue.work2.image ? (
                <img
                  src={inputValue.work2.image}
                  className={"profileImagePreview"}
                />
              ) : (
                <div>
                  <FontAwesomeIcon
                    icon={["fas", "camera"]}
                    color={"#ffffff"}
                    size={"5x"}
                  />
                </div>
              )}
              <div
                className={
                  theme === "dark"
                    ? "imageOverlay smallText white bold darkBackgroundColor"
                    : "imageOverlay smallText white bold"
                }
              >
                Choose Image
              </div>
              <input
                className={"fileUploadInput"}
                type="file"
                name="myImage"
                accept="image/*"
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: URL.createObjectURL(event.target.files[0]),
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
              />
            </div>
            <div className={"workTitleDescriptionContainer"}>
              <input
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: event.target.value,
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
                maxLength={20}
                value={inputValue ? inputValue.work2.title : ""}
                placeholder={"Title..."}
                className={
                  "black " +
                  theme +
                  "TextInput questionTextInput questionTextInputSmall black tinyText"
                }
              />
              <div className={"workMinCharacters tinyText gray"}>
                {inputValue
                  ? inputValue.work2.title.length <= 3
                    ? "Min characters: " + (3 - inputValue.work2.title.length)
                    : "Max characters: " + (20 - inputValue.work2.title.length)
                  : "Min characters: 3"}
              </div>
              <div className={"verticalSpacer"} />
              <input
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: event.target.value,
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
                maxLength={30}
                value={inputValue ? inputValue.work2.description : ""}
                placeholder={"Description..."}
                className={
                  "black " +
                  theme +
                  "TextInput questionTextInput questionTextInputSmall black tinyText"
                }
              />
              <div className={"workMinCharacters tinyText gray"}>
                {inputValue
                  ? inputValue.work2.description.length <= 10
                    ? "Min characters: " +
                      (10 - inputValue.work2.description.length)
                    : "Max characters: " +
                      (30 - inputValue.work2.description.length)
                  : "Min characters: 10"}
              </div>
            </div>
          </div>
          <div className={"workInformationContainer"}>
            <div
              className={
                theme === "dark"
                  ? "profileImageUpload darkBackgroundColor"
                  : "profileImageUpload"
              }
            >
              {inputValue && inputValue.work3.image ? (
                <img
                  src={inputValue.work3.image}
                  className={"profileImagePreview"}
                />
              ) : (
                <div>
                  <FontAwesomeIcon
                    icon={["fas", "camera"]}
                    color={"#ffffff"}
                    size={"5x"}
                  />
                </div>
              )}
              <div
                className={
                  theme === "dark"
                    ? "imageOverlay smallText white bold darkBackgroundColor"
                    : "imageOverlay smallText white bold"
                }
              >
                Choose Image
              </div>
              <input
                className={"fileUploadInput"}
                type="file"
                name="myImage"
                accept="image/*"
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: URL.createObjectURL(event.target.files[0]),
                      title: inputValue ? inputValue.work3.title : "",
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
              />
            </div>
            <div className={"workTitleDescriptionContainer"}>
              <input
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: event.target.value,
                      description: inputValue
                        ? inputValue.work3.description
                        : "",
                    },
                  });
                }}
                maxLength={20}
                value={inputValue ? inputValue.work3.title : ""}
                placeholder={"Title..."}
                className={
                  "black " +
                  theme +
                  "TextInput questionTextInput questionTextInputSmall black tinyText"
                }
              />
              <div className={"workMinCharacters tinyText gray"}>
                {inputValue
                  ? inputValue.work3.title.length <= 3
                    ? "Min characters: " + (3 - inputValue.work3.title.length)
                    : "Max characters: " + (20 - inputValue.work3.title.length)
                  : "Min characters: 3"}
              </div>
              <div className={"verticalSpacer"} />
              <input
                onChange={(event) => {
                  inputFunc({
                    work1: {
                      image: inputValue ? inputValue.work1.image : "",
                      title: inputValue ? inputValue.work1.title : "",
                      description: inputValue
                        ? inputValue.work1.description
                        : "",
                    },
                    work2: {
                      image: inputValue ? inputValue.work2.image : "",
                      title: inputValue ? inputValue.work2.title : "",
                      description: inputValue
                        ? inputValue.work2.description
                        : "",
                    },
                    work3: {
                      image: inputValue ? inputValue.work3.image : "",
                      title: inputValue ? inputValue.work3.title : "",
                      description: event.target.value,
                    },
                  });
                }}
                maxLength={30}
                value={inputValue ? inputValue.work3.description : ""}
                placeholder={"Description..."}
                className={
                  "black " +
                  theme +
                  "TextInput questionTextInput questionTextInputSmall black tinyText"
                }
              />
              <div className={"workMinCharacters tinyText gray"}>
                {inputValue
                  ? inputValue.work3.description.length <= 10
                    ? "Min characters: " +
                      (10 - inputValue.work3.description.length)
                    : "Max characters: " +
                      (30 - inputValue.work3.description.length)
                  : "Min characters: 10"}
              </div>
            </div>
          </div>
        </div>
        <div className={"minText tinyText gray"}>
          Try to upload high quality images (At least 1024px x 1024px)
        </div>
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        Which{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>theme</span>{" "}
        do you like more?
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us whether you like the light or dark theme.
      </div>
    ),
    objectName: "theme",
    isCompleted: (inputValue) => true,
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"themeRowContainer"}>
        <div
          className={
            inputValue === "light"
              ? "lightDarkPickerContainer"
              : "lightDarkPickerContainer"
          }
        >
          <div
            className={
              inputValue === "light"
                ? "smallText bold blue"
                : "smallText bold gray"
            }
          >
            Light
          </div>
          <div className={"verticalSpacer"} />
          <div
            className={
              inputValue === "light"
                ? "circlePickerOuter blueBorder"
                : "circlePickerOuter"
            }
            onClick={() => {
              inputFunc("light");
            }}
          >
            <div
              className={inputValue === "light" ? "circlePickerInner" : ""}
            />
          </div>
        </div>
        <div className={"horizontalSpacer"} />
        <div className={"horizontalSpacer"} />
        <div className={"horizontalSpacer"} />
        <div className={"horizontalSpacer"} />
        <div className={"horizontalSpacer"} />
        <div
          className={
            inputValue === "dark"
              ? "lightDarkPickerContainer"
              : "lightDarkPickerContainer"
          }
        >
          <div
            className={
              inputValue === "dark"
                ? "smallText bold lightPurple"
                : "smallText bold gray"
            }
          >
            Dark
          </div>
          <div className={"verticalSpacer"} />
          <div
            className={
              inputValue === "dark"
                ? "circlePickerOuter purpleBorder"
                : "circlePickerOuter"
            }
            onClick={() => {
              inputFunc("dark");
            }}
          >
            <div
              className={
                inputValue === "dark"
                  ? "circlePickerInner darkBackgroundColor"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What's your{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          email address?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us how people will contact you.
      </div>
    ),
    objectName: "emailAddress",
    isCompleted: (inputValue) => inputValue && inputValue.trim().length > 0 && /\S+@\S+\.\S+/.test(inputValue),
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"questionTextInputContainer"}>
        <div
          className={
            theme === "light"
              ? "mediumText black bold"
              : "mediumText lightPurple bold"
          }
        >
          My email is{" "}
        </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"johnsmith@gmail.com..."}
          className={
            "black " +
            theme +
            "TextInput questionTextInput mediumText questionTextInputUltraWide"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What's your{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          phone number?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us how people will contact you.
      </div>
    ),
    objectName: "phoneNumber",
    isCompleted: (inputValue) => inputValue && inputValue.trim().length > 0,
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"questionTextInputContainer"}>
        <div
          className={
            theme === "light"
              ? "mediumText black bold"
              : "mediumText lightPurple bold"
          }
        >
          My phone number is{" "}
        </div>
        <div className={"questionSpacer"} />
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          type={"tel"}
          placeholder={"(425) 111-1111..."}
          className={
            "black " +
            theme +
            "TextInput questionTextInput mediumText questionTextInputWide"
          }
        />
      </div>
    ),
  },
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What are your{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          social medias?
        </span>
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        Tell us how people can discover you.
      </div>
    ),
    isCompleted: (inputValue) => true,
    objectName: "socialMedias",
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"socialMediasOuterContainer"}>
        {[
          "instagram",
          "facebook",
          "twitter",
          "youtube",
          "linkedin",
          "pinterest",
          "tiktok",
        ].map((eachSocial) => (
          <div className={"socialMediasContainer"}>
            <div>
              <FontAwesomeIcon
                icon={["fab", eachSocial]}
                color={theme === "light" ? "#0e8afc" : "#ccd7f6"}
                size={"3x"}
              />
            </div>
            <div className={"socialMediaHorizontalSpacer"} />
            <input
              onChange={(event) =>
                inputFunc({
                  instagram: inputValue ? inputValue.instagram : "",
                  facebook: inputValue ? inputValue.facebook : "",
                  twitter: inputValue ? inputValue.twitter : "",
                  youtube: inputValue ? inputValue.youtube : "",
                  linkedin: inputValue ? inputValue.linkedin : "",
                  pinterest: inputValue ? inputValue.pinterest : "",
                  [eachSocial]: event.target.value,
                })
              }
              value={inputValue ? inputValue[eachSocial] : ""}
              placeholder={"Link to your " + eachSocial + "..."}
              className={
                "black " + theme + "TextInput questionTextInput tinyText"
              }
            />
          </div>
        ))}
      </div>
    ),
  },
  /*
  {
    questionTitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "largerText black bold"
            : "largerText lightPurple bold"
        }
      >
        What{" "}
        <span className={theme === "light" ? "blue" : "neonGreen"}>
          domain name
        </span>{" "}
        would you like?
      </div>
    ),
    questionSubtitle: (theme) => (
      <div
        className={
          theme === "light"
            ? "black smallText subtitleContainer"
            : "lightPurple smallText subtitleContainer"
        }
      >
        This is what people will type in to get to your site.
      </div>
    ),
    objectName: "domainName",
    questionInput: (inputFunc, inputValue, theme) => (
      <div className={"questionTextInputContainer"}>
        <div
          className={
            theme === "light"
              ? "mediumText black bold"
              : "mediumText lightPurple bold"
          }
        >
          I want the domain{" "}
        </div>
        <div className={"questionSpacer"}></div>
        <input
          onChange={(event) => inputFunc(event.target.value)}
          value={inputValue ? inputValue : ""}
          placeholder={"johnsmith.com..."}
          className={
            "black " +
            theme +
            "TextInput questionTextInput mediumText questionTextInputWide"
          }
        />
      </div>
    ),
  },
  */
];
