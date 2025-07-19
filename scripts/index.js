import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

let initialCards = [
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

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card({
        name: item.name,
        link: item.link,
        handleCardClick: (item) => {
          const image = new PopupWithImage(".popup_type_image");
          image.open(item);
          image.setEventListeners();
        },
      });
      const cardElement = card.generateCard();
      cardList.addItemStart(cardElement);
    },
  },
  ".elements"
);
cardList.renderItems();

formList.forEach((formEl) => {
  const valid = new FormValidator(configurationObject, formEl);
  valid.enableValidation();
});

const popupFormAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  formSelector: ".popup__form_add",
  handleFormSubmit: ({ title: name, url: link }) => {
    const card = new Card({
      name: name,
      link: link,
      handleCardClick: (item) => {
        const image = new PopupWithImage(".popup_type_image");
        image.open(item);
        image.setEventListeners();
      },
    });
    const cardElement = card.generateCard();
    cardList.addItemStart(cardElement);
  },
});

popupFormAdd.setEventListeners();

const popupFormEdit = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  formSelector: ".popup__form_edit",
  handleFormSubmit: (item) => {
    const user = new UserInfo({
      nameSelector: ".profile__name",
      jobSelector: ".profile__occupation",
    });
    user.getUserInfo(item);
    user.setUserInfo();
  },
});

popupFormEdit.setEventListeners();
