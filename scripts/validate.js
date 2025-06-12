const configurationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "input-error_active",
};

const enableValidation = (configObj) => {
  const showInputError = (formelement, inputElement, errorMessage) => {
    const errorElement = formelement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configObj.inputErrorClass);
    errorElement.classList.add(configObj.errorClass);
    errorElement.textContent = errorMessage;
  };

  const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configObj.inputErrorClass);
    errorElement.classList.remove(configObj.errorClass);
    errorElement.textContent = "";
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideError(formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(configObj.inactiveButtonClass);
      buttonElement.classList.remove("popup__form-button_active");
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(configObj.inactiveButtonClass);
      buttonElement.classList.add("popup__form-button_active");
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(configObj.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      configObj.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const formList = Array.from(
    document.querySelectorAll(configObj.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(configurationObject);
