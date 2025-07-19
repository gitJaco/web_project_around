export default class FormValidator {
  constructor(configObj, formElement) {
    this._configObj = configObj;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._configObj.inputErrorClass);
    errorElement.classList.add(this._configObj.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._configObj.inputErrorClass);
    errorElement.classList.remove(this._configObj.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._configObj.inactiveButtonClass);
      this._buttonElement.classList.remove("popup__form-button_active");
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._configObj.inactiveButtonClass);
      this._buttonElement.classList.add("popup__form-button_active");
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._configObj.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._configObj.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
