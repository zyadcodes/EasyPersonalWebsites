// This is the main app file that is launched when the user opens the web app
import React, { useEffect } from "react";
import firebase from "firebase";
import PersonalWebsite from "./screens/PersonalWebsite/PersonalWebsite";
import WebsiteCreator from "./screens/WebsiteCreator/WebsiteCreator";
import CheckoutForm from "./screens/WebsiteCreator/CheckoutForm";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  TermsOfService,
  PrivacyPolicy,
} from "./screens/WebsiteCreator/TermsStrings";
import TermsPage from "./screens/TermsPage/TermsPage";

// Initializes the web app's connection to Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBmwGU-zQ52KTcj-X6GHxd2QRic16V8yOM",
  authDomain: "easypersonalwebsites.firebaseapp.com",
  projectId: "easypersonalwebsites",
  storageBucket: "easypersonalwebsites.appspot.com",
  messagingSenderId: "456054332203",
  appId: "1:456054332203:web:ef55947b16e9690963836e",
  measurementId: "G-6QLC35S1E2",
});
firebase.analytics();

// Loads all icons
library.add(fab, fas);

// Declares the app
const App = () => {
  // Tests which file to render based on the entered URL. If easypersonalwebsites.com is entered, then it is going to
  // go to the website creator. Otherwise, it goes to the personal website
  const currentURL = window.location;
  
  // Returns the Privacy URLs if necessary
  if (currentURL.pathname === "/PrivacyPolicy") {
    return <TermsPage termsString={PrivacyPolicy} />;
  } else if (currentURL.pathname === "/TermsOfService") {
    return <TermsPage termsString={TermsOfService} />;
  }

  // Returns the normal website
  if (
    currentURL.host === "easypersonalwebsites.com" &&
    currentURL.pathname === "/"
  ) {
    return <WebsiteCreator />;
  } else {
    return <PersonalWebsite />;
  }
};

// Exports the app
export default App;
