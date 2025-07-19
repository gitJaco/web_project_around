import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, handleFormSubmit }, openSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._openButton = document.querySelector(openSelector);
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".popup__form-input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
      this.close();
    });
  }
}
