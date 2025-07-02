const popupEl = document.querySelector(".popup");
const editBtn = document.querySelector(".profile__edit-button");
const closeBtn = popupEl.querySelector(".popup__close-button");
const formElement2 = document.querySelector(".popup_add");
const addBtn = document.querySelector(".profile__add-button");
const addCloseBtn = formElement2.querySelector(".popup__close-button");

export function handleEditWindow() {
  popupEl.classList.toggle("popup_opened");
}

export function handleAddWindow() {
  formElement2.classList.toggle("popup_opened");
}
editBtn.addEventListener("click", handleEditWindow);
closeBtn.addEventListener("click", handleEditWindow);
addBtn.addEventListener("click", handleAddWindow);
addCloseBtn.addEventListener("click", handleAddWindow);
