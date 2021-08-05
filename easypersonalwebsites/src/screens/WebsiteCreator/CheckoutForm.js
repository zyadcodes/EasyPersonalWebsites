import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import "../../config/fontStyles.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import EPWLogo from "../../assets/EPW Logo.png";
import MyButton from "../../components/MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-awesome-modal";
import { TermsOfService, PrivacyPolicy } from "./TermsStrings";
import { createCustomer, createTestCustomer } from "../../config/server";

// Creates the component
const CheckoutForm = ({
  userInput,
  processTransaction,
  completeCheckout,
  affiliateLink,
}) => {
  // The stripe hook
  const stripe = useStripe();
  const elements = useElements();

  // Contains the state for the non-card fields
  const [cardDetailsFocused, setCardDetailsFocused] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [termsString, setTermsString] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  // Gets today's day's suffix
  const nth = () => {
    const d = new Date().getDate();
    if (d > 3 && d < 21) return d + "th";
    switch (d % 10) {
      case 1:
        return d + "st";
      case 2:
        return d + "nd";
      case 3:
        return d + "rd";
      default:
        return d + "th";
    }
  };

  // Attemps to process the payment
  const completeTransaction = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }
    if (
      [
        firstName,
        lastName,
        address,
        city,
        zipCode,
        country,
        region,
        phoneNumber,
        email,
      ].findIndex((eachField) => eachField.trim() === "") !== -1
    ) {
      setErrorMessage("You have some incomplete fields");
      setIsErrorVisible(true);
      setDisabledButton(false);
    } else {
      const cardElement = elements.getElement(CardElement);
      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        // Displays error for incorrect card info
        setErrorMessage("Please enter valid card details");
        setIsErrorVisible(true);
        setDisabledButton(false);
      } else {
        processTransaction();
        const customerID = await createCustomer(
          userInput,
          {
            paymentMethod: paymentMethod.id,
            firstName,
            lastName,
            address,
            city,
            zipCode,
            country,
            region,
            phoneNumber,
            email,
          },
          affiliateLink
        );
        completeCheckout(customerID);
      }
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <div className={"checkoutContainer"}>
        <div className={"paymentFormContainer"}>
          <div className={"tinyText blue paymentMethodText bold"}>
            Payment Method
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"tinyText black"}>Card Details</div>
          <div className={"verticalSpacer"} />
          <div
            className={
              cardDetailsFocused
                ? "cardDetailsContainer focusedDetails"
                : "cardDetailsContainer"
            }
          >
            <CardElement
              onFocus={() => setCardDetailsFocused(true)}
              onBlur={() => setCardDetailsFocused(false)}
            />
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"detailsComponent"}>
            <input
              onChange={(event) => setFirstName(event.target.value)}
              name={"fname"}
              value={firstName}
              className={"detailsInput smallInput"}
              placeholder={"First name..."}
            />
            <input
              onChange={(event) => setLastName(event.target.value)}
              name={"lname"}
              value={lastName}
              className={"detailsInput smallInput"}
              placeholder={"Last name..."}
            />
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"tinyText black"}>Invoice Details</div>
          <div className={"verticalSpacer"} />
          <input
            onChange={(event) => setAddress(event.target.value)}
            name={"address"}
            value={address}
            className={"detailsInput largeInput"}
            placeholder={"Address..."}
          />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"detailsComponent"}>
            <input
              onChange={(event) => setCity(event.target.value)}
              name={"city"}
              value={city}
              className={"detailsInput smallInput"}
              placeholder={"City..."}
            />
            <input
              onChange={(event) => setZipCode(event.target.value)}
              name={"zipcode"}
              value={zipCode}
              className={"detailsInput smallInput"}
              placeholder={"Zip code..."}
            />
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"detailsComponent"}>
            <CountryDropdown
              valueType={"short"}
              classes={"detailsInput selectInput"}
              value={country}
              onChange={(newCountry) => {
                setCountry(newCountry);
              }}
            />
            <RegionDropdown
              classes={"detailsInput selectInput"}
              country={country}
              value={region}
              countryValueType="short"
              onChange={(newRegion) => {
                setRegion(newRegion);
              }}
            />
          </div>
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"detailsComponent"}>
            <input
              onChange={(event) => setPhoneNumber(event.target.value)}
              name={"phone"}
              value={phoneNumber}
              className={"detailsInput smallInput"}
              placeholder={"Phone Number..."}
            />
            <input
              onChange={(event) => setEmail(event.target.value)}
              name={"email"}
              value={email}
              className={"detailsInput smallInput"}
              placeholder={"Email..."}
            />
          </div>
        </div>
        <div className={"paymentSummaryCenterAlign"}>
          <div className={"paymentSummaryContainer"}>
            <div className={"tinyText blue paymentSummaryText bold"}>
              Summary
            </div>
            <div className={"verticalSpacer"} />
            <div className={"checkoutInfoContainer"}>
              <img src={EPWLogo} className={"checkoutSmallLogo"} />
              <div>
                <div className={"tinyText black"}>Personal Website</div>
                <div className={"verticalSpacer"} />
                <div
                  className={"tinyText blue italics underline clickable"}
                  onClick={() => {
                    const expiresDate = new Date();
                    expiresDate.setDate(expiresDate.getDate() + 1);
                    openInNewTab(
                      "https://easypersonalwebsites.com/sXvjnA9Mi60qhXy2Gcb1"
                    );
                  }}
                >
                  Example
                </div>
              </div>
            </div>
            <div className={"verticalSpacer"} />
            <div className={"paymentContainer"}>
              <div className={"checkoutRow"}>
                <div className={"tinyText black"}>Website Monthly Fee</div>
                <div className={"tinyText black"}>$7.99</div>
              </div>
              <div className={"verticalSpacer"} />
              <div className={"checkoutRow"}>
                <div className={"tinyText black bold"}>Total</div>
                <div className={"tinyText black bold"}>$7.99</div>
              </div>
            </div>
            <div className={"verticalSpacer"} />
            <div className={"verticalSpacer"} />
            <div className={"payButtonContainer"}>
              <MyButton
                payButton={true}
                text={"Submit Purchase"}
                disabled={disabledButton}
                onClick={async () => {
                  setDisabledButton(true);
                  completeTransaction();
                }}
              />
            </div>
            <div className={"securePaymentContainer"}>
              <FontAwesomeIcon
                icon={["fas", "check"]}
                color={"#008000"}
                size={"2x"}
              />
              <div>Safe & Secure Payment</div>
            </div>
            <div className={"verticalSpacer"} />
            <div className={"termsContainer"}>
              <div className={"miniText black"}>
                By purchasing, you accept the{" "}
                <span
                  className={"underline blue clickable"}
                  onClick={() => {
                    setTermsString(TermsOfService);
                    setIsTermsVisible(true);
                  }}
                >
                  Terms of Service
                </span>{" "}
                and acknowledge reading the{" "}
                <span
                  className={"underline blue clickable"}
                  onClick={() => {
                    setTermsString(PrivacyPolicy);
                    setIsTermsVisible(true);
                  }}
                >
                  Privacy Policy.
                </span>
                .
              </div>
              <div className={"verticalSpacer"} />
              <div className={"miniText black"}>
                Your card will be charged on the {nth()} of every month starting
                today.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={isTermsVisible}
        effect="fadeInUp"
        onClickAway={() => setIsTermsVisible(false)}
      >
        <div className={"modal"}>{termsString}</div>
      </Modal>
      <Modal
        visible={isErrorVisible}
        effect="fadeInUp"
        onClickAway={() => setIsErrorVisible(false)}
      >
        <div className={"checkoutFieldsModal"}>
          <FontAwesomeIcon
            icon={["fas", "exclamation-triangle"]}
            color={"#0e8afc"}
            size={"3x"}
          />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"verticalSpacer"} />
          <div className={"tinyText black"}>{errorMessage}</div>
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

// Loads the stripe promise
const stripePromise = loadStripe(
  "pk_live_51IXfOfBJstUUYUa3EHteHgVBi5dxhGo5fdQiW6yRCHvlV9eVBX4rp010ECKpLcP4UU1iG8FRaMHH0FYUfrZiCyU300ejq6nohZ"
);

// Exports the component
export default ({
  userInput,
  completeCheckout,
  processTransaction,
  affiliateLink,
}) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm
      affiliateLink={affiliateLink}
      userInput={userInput}
      completeCheckout={(customerID) => completeCheckout(customerID)}
      processTransaction={processTransaction}
    />
  </Elements>
);
