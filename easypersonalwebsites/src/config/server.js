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
const createCustomer = async (userInput, paymentObject) => {
  const storageRef = firebase.storage().ref();

  // Stores the pictures that are going to uploaded to Cloud Storage
  const { profilePictures, workPictures } = userInput;
  // The reference to user's folder in cloud storage
  const storageFolder = userInput.domainName + "/";
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

  // Deletes the unnecessary fields that won't be uploaded to Firebase
  delete userInput.profilePictures;
  delete userInput.workPictures.work1.image;
  delete userInput.workPictures.work2.image;
  delete userInput.workPictures.work3.image;

  const result = await firebase.functions().httpsCallable("createCustomer")({
    userInput,
    paymentObject,
  });
  return result.data;
};

// This is going to submit a rating that a customer left after completing the entire purchase process
const submitRating = async (domainName, rating) => {
  const result = await firebase.functions().httpsCallable("submitRating")({
    domainName,
    rating,
  });
  return result.data;
};

// This is going to fetch all of the user's data including URL for images from the user's data in Firestore & Cloud Storage
const getCustomerObject = async (domainName) => {
  // Creates a ref to storage
  const storageRef = firebase.storage().ref();
  const foldersPrefix = domainName + "/";

  // Creates the promise to fetch all of the user's data at once
  const promises = await Promise.all([
    firebase.functions().httpsCallable("getCustomerObject")({
      domainName,
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

export {
  searchDomain,
  createCustomer,
  submitRating,
  getCustomerObject,
  logEvent,
};
