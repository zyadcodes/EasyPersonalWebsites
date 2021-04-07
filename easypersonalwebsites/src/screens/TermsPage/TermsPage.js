// This is going to be the screen which holds the terms page for the website which include Terms of Service as well as
// the Privacy Policy
import React from "react";
import FadeIn from "react-fade-in";
import EPWLogo from "../../assets/EPW Logo.png";
import './TermsPage.css';

// Creates the functional component
const TermsPage = ({ termsString }) => {
  return (
    <FadeIn transitionDuration={1000}>
      <div className={'termsPageContainer'}>
      <img src={EPWLogo} className={"smallLogoTermsPage"} />
      {termsString}
      </div>
    </FadeIn>
  );
};

// Exports the component
export default TermsPage;
