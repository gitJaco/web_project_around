export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(".popup__close-button");
  }
  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOutsideClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleOutsideClick(evt);
    });
  }
}
