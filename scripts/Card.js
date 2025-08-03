export default class Card {
  constructor({
    name,
    link,
    id,
    isLiked,
    handleCardClick,
    handleTrash,
    handleLike,
  }) {
    this._title = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleTrash = handleTrash;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card__template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  isLiked(res) {
    if (res.isLiked) {
      this._likeElement.src = "./images/Union.svg";
    } else {
      this._likeElement.src = "./images/like2.svg";
    }
    this._isLiked = res.isLiked;
  }

  _setTrash() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._handleLike(this._id, this._isLiked);
      console.log(this._isLiked);
    });
    this._trashElement.addEventListener("click", () => {
      const popupConfirmation = document.querySelector(".popup_type_delete");
      popupConfirmation.classList.add("popup_opened");
      this._handleTrash(this._element, this._id);
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

    this._likeElement.src = this._isLiked
      ? "./images/Union.svg"
      : "./images/like2.svg";

    this._setEventListeners();

    return this._element;
  }
}
