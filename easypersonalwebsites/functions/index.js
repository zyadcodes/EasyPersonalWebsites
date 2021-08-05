// This is where all of the backend functions will be located
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const fetch = require("node-fetch");
const stripe = require("stripe")(
  "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"
);
const nodemailer = require("nodemailer");
const { firestore } = require("firebase-admin");
const { user } = require("firebase-functions/lib/providers/auth");

// Configures the email transport
const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "zyadprofessional@gmail.com",
    pass: "zBusiness123!",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Initializes the Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "easypersonalwebsites.appspot.com",
});

// This will search for a given domain name. If the name is available, it will return its price. If it is not
// available, it will return -1;
exports.searchDomain = functions.https.onCall(async (data) => {
  const { url } = data;
  if (url.includes("BYPASS:")) {
    return 12.99;
  }
  if (!url.includes(".") || url.includes(" ")) {
    return -1;
  }
  try {
    const result = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.secureserver.net/api/v1/search/exact?plid=1592&q=" +
        url
    );
    const json = await result.json();
    let isAvailable =
      json.Products[0].ProductId !== 0 && url === json.ExactMatchDomain.Fqdn;

    if (isAvailable) {
      const price = json.Products[0].PriceInfo.CurrentPrice;

      if (price > 17.99) {
        return -1;
      }
      return price;
    } else {
      return -1;
    }
  } catch (error) {
    // Puts the error object in Firestore to be reviewed later. In order to keep the User Experience going, it will
    // say that the particular domain is available. Customer Service will deal with the issue later.
    await admin
      .firestore()
      .collection("Errors")
      .add({
        errorMessage: error.message,
        functionError: "searchDomain",
        searchedDomain: url ? url : "",
      });
    return 12.99;
  }
});

// This is going to create a customer in Firebase as well as register them into the stripe database as well as upload data into
// Firebase storage
exports.createCustomer = functions.https.onCall(async (data) => {
  const { userInput, paymentObject, affiliateLink } = data;

  // Pushes data to Cloud Firestore & creates a stripe object
  const promiseResults = await Promise.all([
    admin.firestore().collection("Customers").add(userInput),
    stripe.customers.create({
      "address[line1]": paymentObject.address,
      "address[city]": paymentObject.city,
      "address[country]": paymentObject.country,
      "address[line2]": "",
      "address[postal_code]": paymentObject.zipCode,
      "address[state]": paymentObject.region,
      email: paymentObject.email,
      name: paymentObject.firstName + " " + paymentObject.lastName,
      payment_method: paymentObject.paymentMethod,
      phone: paymentObject.phoneNumber,
      "invoice_settings[default_payment_method]": paymentObject.paymentMethod,
    }),
  ]);

  await firestore().collection("Customers").doc(promiseResults[0].id).update({
    customerID: promiseResults[0].id,
  });

  // Creates the subscription for the test customer
  const stripeCustomerID = promiseResults[1].id;
  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerID,
    items: [{ price: "price_1Iauo4BJstUUYUa38Ar1m5aq" }],
  });
  const invoicePDFURL = (
    await stripe.invoices.retrieve(subscription.latest_invoice)
  ).invoice_pdf;

  // Attaches the stripe customerID to the server version
  await admin
    .firestore()
    .collection("Stripe")
    .doc(promiseResults[0].id)
    .set({
      stripeCustomerID,
      address: {
        line1: paymentObject.address,
        city: paymentObject.city,
        country: paymentObject.country,
        line2: "",
        postal_code: paymentObject.zipCode,
        state: paymentObject.region,
      },
      email: paymentObject.email,
      name: paymentObject.firstName + " " + paymentObject.lastName,
      payment_method: paymentObject.paymentMethod,
      phone: paymentObject.phoneNumber,
      subscriptionActive: true,
    });

  // Adds a purchase to the affililate link if there is one
  if (affiliateLink !== "") {
    await admin
      .firestore()
      .collection("Affiliate")
      .doc(affiliateLink)
      .update({
        numPurchases: admin.firestore.FieldValue.increment(1),
      });
  }

  try {
    // Sends a welcome confirmation email to the email that was put in with the latest invoice
    await mailTransport.sendMail({
      from: "Zyad Codes <zyadprofessional@gmail.com>",
      to: paymentObject.email,
      subject: "Welcome to Easy Personal Websites!",
      text:
        "Hey!\n\n" +
        "Thank you so much for creating your website with this tool I created! With the subscription that you've paid for, you get a domain hosted forever, constant SEO improvements, unlimited website maintenance, and constant upgrades and improvements. Since I'm what I call a \"microbusiness\", consider yourself apart of the EPW family! Everytime I make an upgrade or an adjustment to the website, I'll shoot you an email! You can always give me direct feedback or ask any questions by reaching out to me at zyadprofessional@gmail.com." +
        "\n\n" +
        "As mentioned when you created the site, you get a domain hosted with your subscription. I'll be personally in touch with you within the next few hours to help you pick out a domain! For now, your temporary website is https://easypersonalwebsites.com/" +
        promiseResults[0].id +
        "\n\n" +
        "Just to remind you, your subscription is $7.99 per month starting today (with a guaranteed no price increase). For your reference, I've attached a link to the first invoice below. Again, if you have any questions please reach out to me at zyadprofessional@gmail.com. Enjoy your site!" +
        "\n\n" +
        "- Zyad\n\n" +
        "Invoice: " +
        invoicePDFURL,
    });

    // Sends myself an email to get notified that a customer was created and their domain should be created
    await mailTransport.sendMail({
      from: "Zyad Codes <zyadprofessional@gmail.com>",
      to: "zyadprofessional@gmail.com",
      subject: "New Customer",
      text:
        "Hey!\n\n" +
        "You're doing it dude! You got a new customer! That's a new stream of income right there. Congrats!!! Below is some information attached from your past self. Enjoy it dude, I'm SUPER proud of you :)" +
        "\n\n" +
        "Customer email: " +
        paymentObject.email +
        "\n\n" +
        "CustomerID: " +
        promiseResults[0].id +
        "\n\n" +
        "Latest customer invoice PDF: " +
        invoicePDFURL,
    });

    return promiseResults[0].id;
  } catch (error) {
    // Adds an error to firebase
    admin
      .firestore()
      .collection("Errors")
      .add({
        errorMessage: error.message,
        functionError: "createCustomer",
        userEmail: paymentObject ? paymentObject.email : "",
      });
  }
  return 0;
});

// This is an identical function to createCustomer except it doesn't create the payment in Stripe --> Just for testing
exports.createTestCustomer = functions.https.onCall(async (data) => {
  const { userInput, paymentObject, affiliateLink } = data;

  // Pushes data to Cloud Firestore & creates a stripe object
  const promiseResults = await Promise.all([
    admin.firestore().collection("Customers").add(userInput),
  ]);

  await firestore().collection("Customers").doc(promiseResults[0].id).update({
    customerID: promiseResults[0].id,
  });


  // Adds a purchase to the affililate link if there is one
  if (affiliateLink !== "") {
    await admin
      .firestore()
      .collection("Affiliate")
      .doc(affiliateLink)
      .update({
        numPurchases: admin.firestore.FieldValue.increment(1),
      });
  }

  try {
    // Sends a welcome confirmation email to the email that was put in with the latest invoice
    await mailTransport.sendMail({
      from: "Zyad Codes <zyadprofessional@gmail.com>",
      to: paymentObject.email,
      subject: "Welcome to Easy Personal Websites!",
      text:
        "Hey!\n\n" +
        "Thank you so much for creating your website with this tool I created! With the subscription that you've paid for, you get a domain hosted forever, constant SEO improvements, unlimited website maintenance, and constant upgrades and improvements. Since I'm what I call a \"microbusiness\", consider yourself apart of the EPW family! Everytime I make an upgrade or an adjustment to the website, I'll shoot you an email! You can always give me direct feedback or ask any questions by reaching out to me at zyadprofessional@gmail.com." +
        "\n\n" +
        "As mentioned when you created the site, you get a domain hosted with your subscription. I'll be personally in touch with you within the next few hours to help you pick out a domain! For now, your temporary website is https://easypersonalwebsites.com/" +
        promiseResults[0].id +
        "\n\n" +
        "Just to remind you, your subscription is $7.99 per month starting today (with a guaranteed no price increase). For your reference, I've attached a link to the first invoice below. Again, if you have any questions please reach out to me at zyadprofessional@gmail.com. Enjoy your site!" +
        "\n\n" +
        "- Zyad\n\n" +
        "Invoice: " +
        "Test",
    });

    // Sends myself an email to get notified that a customer was created and their domain should be created
    await mailTransport.sendMail({
      from: "Zyad Codes <zyadprofessional@gmail.com>",
      to: "zyadprofessional@gmail.com",
      subject: "New Customer",
      text:
        "Hey!\n\n" +
        "You're doing it dude! You got a new customer! That's a new stream of income right there. Congrats!!! Below is some information attached from your past self. Enjoy it dude, I'm SUPER proud of you :)" +
        "\n\n" +
        "Customer email: " +
        paymentObject.email +
        "\n\n" +
        "CustomerID: " +
        promiseResults[0].id +
        "\n\n" +
        "Latest customer invoice PDF: " +
        "Test",
    });

    return promiseResults[0].id;
  } catch (error) {
    // Adds an error to firebase
    admin
      .firestore()
      .collection("Errors")
      .add({
        errorMessage: error.message,
        functionError: "createCustomer",
        userEmail: paymentObject ? paymentObject.email : "",
      });
  }
  return 0;
});

// This is going to submit a rating that a customer left after completing the entire purchase process
exports.submitRating = functions.https.onCall(async (data) => {
  const { customerID, rating } = data;
  await admin.firestore().collection("Customers").doc(customerID).update({
    rating,
  });
  return 0;
});

// This is going to retrieve a user's firestore data based on the requested domain name
exports.getCustomerObject = functions.https.onCall(async (data) => {
  const { customerID } = data;
  const customerObject = await admin
    .firestore()
    .collection("Customers")
    .doc(customerID)
    .get();
  return customerObject.data();
});

// This is going to create an affiliate document in Firebase in order to track the usage of a specific affiliate link
exports.createAffiliateLink = functions.https.onCall(async (data) => {
  const { username } = data;

  // Checks if the user already has a link. If so, returns -1
  const document = await admin
    .firestore()
    .collection("Affiliate")
    .doc(username)
    .get();
  if (document.exists) {
    return -1;
  }

  await admin
    .firestore()
    .collection("Affiliate")
    .doc(username)
    .set({
      link: "https://easypersonalwebsites.com/affiliateLink=" + username,
      numPurchases: 0,
    });

  return "https://easypersonalwebsites.com/affiliateLink=" + username;
});
