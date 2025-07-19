export default class Card {
  constructor({ name, link, handleCardClick }) {
    this._title = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._setLike();
    });
    this._trashElement.addEventListener("click", () => {
      this._setTrash();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._title, link: this._link });
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
