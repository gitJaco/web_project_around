const popupEl = document.querySelector(".popup");
const editBtn = document.querySelector(".profile__edit-button");
const closeBtn = popupEl.querySelector(".popup__close-button");
const formElement = popupEl.querySelector(".popup__form");
const formBtn = formElement.querySelector(".popup__form-button");

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

  // nameInput.value = profileName.textContent;
  // jobInput.value = profileOccupation.textContent;
  handleEditWindow();
}

function handleFormButton() {
  const inputs = formElement.querySelectorAll("input[required]");
  const allFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );

  if (allFilled) {
    formBtn.classList.add("popup__form-button_active");
  } else {
    formBtn.classList.remove("popup__form-button_active");
  }
}

editBtn.addEventListener("click", handleEditWindow);
closeBtn.addEventListener("click", handleEditWindow);
formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("input", handleFormButton);
