const popupEl = document.querySelector(".popup");
const editBtn = document.querySelector(".profile__edit-button");
const closeBtn = popupEl.querySelector(".popup__close-button");
const formElement = popupEl.querySelector(".popup__form");
const formElement2 = document.querySelector(".popup_add");
const formBtn = formElement.querySelector(".popup__form-button");
const addBtn = document.querySelector(".profile__add-button");
const addCloseBtn = formElement2.querySelector(".popup__close-button");
const imagePopup = document.querySelector(".image-popup");
const popup = document.querySelector(".popup");
const popup2 = document.querySelector(".popup_add");
const popupContainer = document.querySelector(".popup__container");
const popupContainer2 = document.querySelector(".popup__container2");
const imageContainer = document.querySelector(".image-popup__container");

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
function setAllCards() {
  initialCards.forEach((card) => {
    const elements = document.querySelector(".elements");
    const cardTemplate = document.querySelector("#card__template").content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

    cardElement.querySelector(".element__name").textContent = card.name;
    cardElement.querySelector(".element__image").src = card.link;
    cardElement
      .querySelector(".element__like")
      .addEventListener("click", function (evt) {
        if (evt.target.src.includes("like2.svg")) {
          evt.target.src = "./images/Union.svg";
        } else {
          evt.target.src = "./images/like2.svg";
        }
      });
    cardElement
      .querySelector(".element__trash")
      .addEventListener("click", function (evt) {
        const cardToDelete = evt.target.closest(".element");
        const elements = document.querySelectorAll(".element");
        elements.forEach((el, index) => {
          if (el === evt.target.closest(".element")) {
            initialCards.splice(index, 1);
          }
        });

        cardToDelete.remove();
      });
    cardElement
      .querySelector(".element__image")
      .addEventListener("click", function (evt) {
        const els = evt.target.closest(".elements").nextElementSibling;
        const popTemplate = document.querySelector(
          "#image-popup__template"
        ).content;
        const popElement = popTemplate
          .querySelector(".image-popup__container")
          .cloneNode(true);
        popElement.querySelector(".image-popup__image").src = evt.target.src;
        const title =
          evt.target.nextElementSibling.firstElementChild.textContent;
        popElement.querySelector(".image-popup__title").textContent = title;

        els.classList.toggle("image-popup_oppened");

        const all = document.querySelectorAll(".image-popup__container");
        all.forEach((el) => {
          el.remove();
        });
        els.append(popElement);

        popElement
          .querySelector(".image-popup__close")
          .addEventListener("click", function (evt) {
            evt.target
              .closest(".image-popup")
              .classList.toggle("image-popup_oppened");
          });
      });

    elements.append(cardElement);
  });
}

function handleEditWindow() {
  popupEl.classList.toggle("popup_opened");
}

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

function handleAddWindow() {
  formElement2.classList.toggle("popup_opened");
}

function handleForm2Button(evt) {
  evt.preventDefault();
  let titleInput = formElement2.querySelector(".popup__form-input_number_one");
  let urlInput = formElement2.querySelector(".popup__form-input_number_two");
  let placeObj = { name: titleInput.value, link: urlInput.value };
  const elements = document.querySelectorAll(".element");
  elements.forEach((el) => {
    el.remove();
  });
  initialCards.unshift(placeObj);
  setAllCards();
  handleAddWindow();
}

function handleTrash(evt) {
  console.log(evt.target);
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

setAllCards();

editBtn.addEventListener("click", handleEditWindow);
closeBtn.addEventListener("click", handleEditWindow);
addBtn.addEventListener("click", handleAddWindow);
addCloseBtn.addEventListener("click", handleAddWindow);
formElement.addEventListener("submit", handleProfileFormSubmit);
formElement2.addEventListener("submit", handleForm2Button);
document.addEventListener("keydown", handleEscape);
popup.addEventListener("click", handle);
popupContainer.addEventListener("click", handleContainer);
popup2.addEventListener("click", handle2);
popupContainer2.addEventListener("click", handleContainer2);
imagePopup.addEventListener("click", handleImage);
