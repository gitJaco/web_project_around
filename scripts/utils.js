const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_add");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");


function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
editBtn.addEventListener("click", () => {
  openPopup(editPopup);
});
addBtn.addEventListener("click", () => {
  openPopup(addPopup);
});

