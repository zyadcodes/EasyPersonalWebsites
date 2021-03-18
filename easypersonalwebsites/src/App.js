// This is the main app file that is launched when the user opens the web app
import React from "react";
import firebase from "firebase";
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';


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

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

// Declares the app
const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

// Exports the app
export default App;
