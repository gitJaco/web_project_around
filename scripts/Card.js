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
    if (this._likeElement.src.includes("like2.svg")) {
      this._likeElement.src = "./images/Union.svg";
    } else {
      this._likeElement.src = "./images/like2.svg";
    }
  }

  _setTrash() {
    this._element.remove();
  }

  _setImage() {
    const imagePopup = document.querySelector(".image-popup");
    const image = document.querySelector(".image-popup__image");
    const title = document.querySelector(".image-popup__title");
    const close = document.querySelector(".image-popup__close");

    imagePopup.classList.toggle("image-popup_oppened");
    image.src = this._link;
    title.textContent = this._title;
    close.addEventListener("click", () => {
      imagePopup.classList.remove("image-popup_oppened");
    });
  }

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._setLike();
    });
    this._trashElement.addEventListener("click", () => {
      this._setTrash();
    });
    this._cardImage.addEventListener("click", () => {
      this._setImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(".element__name");
    this._cardImage = this._element.querySelector(".element__image");
    this._likeElement = this._element.querySelector(".element__like");
    this._trashElement = this._element.querySelector(".element__trash");

    this._cardName.textContent = this._title;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._element;
  }
}
