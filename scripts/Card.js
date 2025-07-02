import { initialCards } from "./index.js";
export default class Card {
  constructor(title, link) {
    this._title = title;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card__template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setLike() {
    const likeElement = this._element.querySelector(".element__like");
    likeElement.addEventListener("click", function () {
      if (likeElement.src.includes("like2.svg")) {
        likeElement.src = "./images/Union.svg";
      } else {
        likeElement.src = "./images/like2.svg";
      }
    });
  }

  _setTrash() {
    const trashElement = this._element.querySelector(".element__trash");
    trashElement.addEventListener("click", () => {
      const elements = document.querySelectorAll(".element");
      elements.forEach((el, index) => {
        if (el === this._element) {
          initialCards.splice(index, 1);
        }
      });
      this._element.remove();
    });
  }

  _setImage() {
    const imageElement = this._element.querySelector(".element__image");
    imageElement.addEventListener("click", () => {
      const popTemplate = document.querySelector(
        "#image-popup__template"
      ).content;
      const popElement = popTemplate
        .querySelector(".image-popup__container")
        .cloneNode(true);
      popElement.querySelector(".image-popup__image").src = this._link;
      popElement.querySelector(".image-popup__title").textContent = this._title;
      const imagePopup = document.querySelector(".image-popup");
      imagePopup.classList.toggle("image-popup_oppened");
      const all = document.querySelectorAll(".image-popup__container");
      all.forEach((item) => {
        item.remove();
      });
      imagePopup.append(popElement);
      const popClose = popElement.querySelector(".image-popup__close");
      popClose.addEventListener("click", function () {
        imagePopup.classList.toggle("image-popup_oppened");
      });
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".element__name").textContent = this._title;
    this._element.querySelector(".element__image").src = this._link;

    this._setLike();
    this._setTrash();
    this._setImage();

    return this._element;
  }
}
