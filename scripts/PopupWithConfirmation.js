import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, element, cardDelete) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._element = element;
    this._cardDelete = cardDelete;
  }

  //   deleteCard(item) {
  //     console.log(item);
  //   }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._cardDelete();
      this._element.remove();
      this.close();
    });
  }
}
