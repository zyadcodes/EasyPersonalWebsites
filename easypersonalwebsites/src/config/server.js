// This is going to contain all of the functions that would typically be located on the backend server side of the app
// They will all be exported as named functions
import firebase from "firebase";
import "firebase/functions";

// This will search for a given domain name. If the name is available, it will return its price. If it is not
// available, it will return -1;
const searchDomain = async (url) => {
  const result = await firebase.functions().httpsCallable("searchDomain")({
    url,
  });
  return result.data;
};

// This is going to create a customer in Firebase as well as register them into the stripe database as well as upload data into
// Firebase storage
const createCustomer = async (userInput, paymentObject, affiliateLink) => {
  const storageRef = firebase.storage().ref();

  const customerID = await firebase.functions().httpsCallable("createCustomer")(
    {
      userInput,
      paymentObject,
      affiliateLink,
    }
  );

  // Stores the pictures that are going to uploaded to Cloud Storage
  const { profilePictures, workPictures } = userInput;
  // The reference to user's folder in cloud storage
  const storageFolder = customerID.data + "/";
  await Promise.all([
    storageRef
      .child(storageFolder + "profileImage1")
      .put(await (await fetch(profilePictures.profileImage1)).blob()),
    storageRef
      .child(storageFolder + "profileImage2")
      .put(await (await fetch(profilePictures.profileImage2)).blob()),
    storageRef
      .child(storageFolder + "workImage1")
      .put(await (await fetch(workPictures.work1.image)).blob()),
    storageRef
      .child(storageFolder + "workImage2")
      .put(await (await fetch(workPictures.work2.image)).blob()),
    storageRef
      .child(storageFolder + "workImage3")
      .put(await (await fetch(workPictures.work3.image)).blob()),
  ]);

  return customerID.data;
};

// This is going to create a test customer in Firebase.
const createTestCustomer = async (
  userInput,
  paymentObject,
  affiliateLink,
  shouldUploadImages
) => {
  const storageRef = firebase.storage().ref();

  const customerID = await firebase
    .functions()
    .httpsCallable("createTestCustomer")({
    userInput,
    paymentObject,
    affiliateLink,
  });

  // Stores the pictures that are going to uploaded to Cloud Storage if testing needs it
  if (shouldUploadImages) {
    const { profilePictures, workPictures } = userInput;
    // The reference to user's folder in cloud storage
    const storageFolder = customerID.data + "/";
    await Promise.all([
      storageRef
        .child(storageFolder + "profileImage1")
        .put(await (await fetch(profilePictures.profileImage1)).blob()),
      storageRef
        .child(storageFolder + "profileImage2")
        .put(await (await fetch(profilePictures.profileImage2)).blob()),
      storageRef
        .child(storageFolder + "workImage1")
        .put(await (await fetch(workPictures.work1.image)).blob()),
      storageRef
        .child(storageFolder + "workImage2")
        .put(await (await fetch(workPictures.work2.image)).blob()),
      storageRef
        .child(storageFolder + "workImage3")
        .put(await (await fetch(workPictures.work3.image)).blob()),
    ]);
  }

  return customerID.data;
};

// This is going to submit a rating that a customer left after completing the entire purchase process
const submitRating = async (customerID, rating) => {
  const result = await firebase.functions().httpsCallable("submitRating")({
    customerID,
    rating,
  });
  return result.data;
};

// This is going to fetch all of the user's data including URL for images from the user's data in Firestore & Cloud Storage
const getCustomerObject = async (customerID) => {
  // Creates a ref to storage
  const storageRef = firebase.storage().ref();
  const foldersPrefix = customerID + "/";

  // Creates the promise to fetch all of the user's data at once
  const promises = await Promise.all([
    firebase.functions().httpsCallable("getCustomerObject")({
      customerID,
    }),
    storageRef.child(foldersPrefix + "profileImage1").getDownloadURL(),
    storageRef.child(foldersPrefix + "profileImage2").getDownloadURL(),
    storageRef.child(foldersPrefix + "workImage1").getDownloadURL(),
    storageRef.child(foldersPrefix + "workImage2").getDownloadURL(),
    storageRef.child(foldersPrefix + "workImage3").getDownloadURL(),
  ]);

  // Construcst the final object to return
  const customerObject = promises[0].data;
  customerObject.profilePictures = {
    profileImage1: promises[1],
    profileImage2: promises[2],
  };
  customerObject.workPictures.work1.image = promises[3];
  customerObject.workPictures.work2.image = promises[4];
  customerObject.workPictures.work3.image = promises[5];

  return customerObject;
};

// This is going to log a specific custom event to Firebase analytics
const logEvent = async (eventName, params) => {
  await firebase.analytics().logEvent(eventName, params);
};

const createAffiliateLink = async (username) => {
  const result = await firebase
    .functions()
    .httpsCallable("createAffiliateLink")({
    username,
  });

  return result.data;
};

export {
  searchDomain,
  createCustomer,
  submitRating,
  getCustomerObject,
  logEvent,
  createAffiliateLink,
  createTestCustomer
};
