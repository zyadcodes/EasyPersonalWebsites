// This is the main app file that is launched when the user opens the web app
import React, { useEffect } from "react";
import firebase from "firebase";
import WebsiteCreator from "./screens/WebsiteCreator/WebsiteCreator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

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
  return <WebsiteCreator />;
};
// Exports the app
export default App;
