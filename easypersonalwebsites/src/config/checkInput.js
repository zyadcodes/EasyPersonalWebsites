// This is going to take in a user's input and is going to return an array containing all of the incomplete fields
const checkInput = (userInput) => {
  const inCompletedFields = [];

  const {
    firstName,
    lastName,
    occupation,
    title,
    occupationDescription,
    aboutMe,
    profilePictures,
    workPictures,
    theme,
    emailAddress,
    phoneNumber,
  } = userInput;

  if (!firstName || firstName.trim().length === 0) {
    inCompletedFields.push({ name: "First Name", index: 0 });
  }
  if (!lastName || lastName.trim().length === 0) {
    inCompletedFields.push({ name: "Last Name", index: 1 });
  }
  if (!occupation || occupation.trim().length === 0) {
    inCompletedFields.push({ name: "Occupation", index: 2 });
  }
  if (!title || title.trim().length === 0) {
    inCompletedFields.push({ name: "Title", index: 3 });
  }
  if (
    !occupationDescription ||
    occupationDescription.length < 120 ||
    occupationDescription.length > 180 ||
    occupationDescription.trim().length === 0
  ) {
    inCompletedFields.push({
      name: "Occupation Description: 120-180 characters",
      index: 4,
    });
  }
  if (!aboutMe || aboutMe.length < 240 || aboutMe.length > 300 || aboutMe.trim().length === 0) {
    inCompletedFields.push({
      name: "Occupation Description: 240-300 characters",
      index: 5,
    });
  }
  if (
    !profilePictures ||
    profilePictures.profileImage1 === "" ||
    profilePictures.profileImage2 === ""
  ) {
    inCompletedFields.push({ name: "Profile Pictures", index: 6 });
  }
  if (
    !workPictures ||
    workPictures.work1.image === "" ||
    workPictures.work1.title.trim().length < 3 ||
    workPictures.work1.title.trim().length > 20 ||
    workPictures.work1.description.trim().length < 10 ||
    workPictures.work1.description.trim().length > 30 ||
    workPictures.work2.image === "" ||
    workPictures.work2.title.trim().length < 3 ||
    workPictures.work2.title.trim().length > 20 ||
    workPictures.work2.description.trim().length < 10 ||
    workPictures.work2.description.trim().length > 30 ||
    workPictures.work3.image === "" ||
    workPictures.work3.title.trim().length < 3 ||
    workPictures.work3.title.trim().length > 20 ||
    workPictures.work3.description.trim().length < 10 ||
    workPictures.work3.description.trim().length > 30
  ) {
    inCompletedFields.push({
      name: "Work Pictures Title & Descriptions",
      index: 7,
    });
  }
  if (!theme || theme.trim() === "") {
    inCompletedFields.push({ name: "Theme", index: 8 });
  }
  if (
    !emailAddress ||
    emailAddress.trim().length === 0 ||
    !/\S+@\S+\.\S+/.test(emailAddress)
  ) {
    inCompletedFields.push({ name: "Email Address", index: 9 });
  }
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    inCompletedFields.push({ name: "Phone Number", index: 10 });
  }
  return inCompletedFields;
};

export { checkInput };
