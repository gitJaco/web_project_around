import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { handleEditWindow } from "./utils.js";
import { handleAddWindow } from "./utils.js";
const popupEl = document.querySelector(".popup");
const formElement = popupEl.querySelector(".popup__form");
const formElement2 = document.querySelector(".popup_add");
const imagePopup = document.querySelector(".image-popup");
const popup = document.querySelector(".popup");
const popup2 = document.querySelector(".popup_add");
const popupContainer = document.querySelector(".popup__container");
const popupContainer2 = document.querySelector(".popup__container2");

export let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const configurationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "input-error_active",
};

const formList = Array.from(
  document.querySelectorAll(configurationObject.formSelector)
);

// function setCards() {
//   initialCards.forEach((item) => {
//     const card = new Card(item.name, item.link);
//     const cardElement = card.generateCard(initialCards);

//     document.querySelector(".elements").append(cardElement);
//   });
// }

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function addCard(name, link) {
  const card = new Card(name, link);
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
}

formList.forEach((formEl) => {
  const valid = new FormValidator(configurationObject, formEl);
  valid.enableValidation();
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".popup__form-input_number_one");
  let jobInput = formElement.querySelector(".popup__form-input_number_two");

  let profileName = document.querySelector(".profile__name");
  let profileOccupation = document.querySelector(".profile__occupation");

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;

  handleEditWindow();
}

function handleForm2Button(evt) {
  evt.preventDefault();
  let titleInput = formElement2.querySelector(".popup__form-input_number_one");
  let urlInput = formElement2.querySelector(".popup__form-input_number_two");
  // let placeObj = { name: titleInput.value, link: urlInput.value };
  // const elements = document.querySelectorAll(".element");
  // elements.forEach((el) => {
  //   el.remove();
  // });
  // initialCards.unshift(placeObj);
  // setCards();
  addCard(titleInput.value, urlInput.value);
  handleAddWindow();
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    popupEl.classList.remove("popup_opened");
    formElement2.classList.remove("popup_opened");
    imagePopup.classList.remove("image-popup_oppened");
  }
}

function handle() {
  popupEl.classList.remove("popup_opened");
}

function handleContainer(evt) {
  evt.stopPropagation();
}

function handle2() {
  formElement2.classList.remove("popup_opened");
}

function handleContainer2(evt) {
  evt.stopPropagation();
}

function handleImage(evt) {
  if (evt.target === imagePopup)
    imagePopup.classList.remove("image-popup_oppened");
}

// setCards();

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement2.addEventListener("submit", handleForm2Button);
document.addEventListener("keydown", handleEscape);
popup.addEventListener("click", handle);
popupContainer.addEventListener("click", handleContainer);
popup2.addEventListener("click", handle2);
popupContainer2.addEventListener("click", handleContainer2);
imagePopup.addEventListener("click", handleImage);
