import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import { api } from "./Api.js";

const configurationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "input-error_active",
};

const formList = Array.from(
  document.querySelectorAll(configurationObject.formSelector)
);

api
  .getInitialCards()
  .then((res) => {
    const cardList = new Section(
      {
        data: res,
        renderer: (item) => {
          const card = new Card({
            name: item.name,
            link: item.link,
            id: item._id,
            isLiked: item.isLiked,
            handleCardClick: (item) => {
              const image = new PopupWithImage(".popup_type_image");
              image.open(item);
              image.setEventListeners();
            },
            handleTrash: (item, id) => {
              const popupConfirmation = new PopupWithConfirmation(
                ".popup_type_delete",
                item,
                () => {
                  api.deleteCard(id).then((res) => {
                    console.log(res);
                  });
                }
              );
              popupConfirmation.setEventListeners();
            },
            handleLike: (id, isLiked) => {
              if (isLiked) {
                api.dislikeCard(id).then((res) => {
                  card.isLiked(res);
                });
              } else {
                api.likeCard(id).then((res) => {
                  card.isLiked(res);
                });
              }
            },
          });
          const cardElement = card.generateCard();
          cardList.addItemStart(cardElement);
        },
      },
      ".elements"
    );
    cardList.renderItems();

    const popupFormAdd = new PopupWithForm(
      {
        popupSelector: ".popup_add",
        formSelector: ".popup__form_add",
        handleFormSubmit: ({ title: name, url: link }) => {
          api
            .postCard({ name, link })
            .then((res) => {
              console.log(res);
              const card = new Card({
                name: res.name,
                link: res.link,
                handleCardClick: (item) => {
                  const image = new PopupWithImage(".popup_type_image");
                  image.open(item);
                  image.setEventListeners();
                },
                handleTrash: (item) => {
                  const popupConfirmation = new PopupWithConfirmation(
                    ".popup_type_delete",
                    item
                  );
                  popupConfirmation.setEventListeners();
                },
              });
              const cardElement = card.generateCard();
              cardList.addItemEnd(cardElement);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
      ".profile__add-button"
    );
    popupFormAdd.setEventListeners();
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then((res) => {
    const user = new UserInfo({
      nameSelector: ".profile__name",
      jobSelector: ".profile__occupation",
      avatarSelector: ".profile__avatar",
    });
    user.getUserInfo(res);
    user.setUserInfo();
  })
  .catch((err) => {
    console.log(err);
  });

formList.forEach((formEl) => {
  const valid = new FormValidator(configurationObject, formEl);
  valid.enableValidation();
});

const popupFormEdit = new PopupWithForm(
  {
    popupSelector: ".popup_type_edit",
    formSelector: ".popup__form_edit",
    handleFormSubmit: (item) => {
      api
        .patchUserInfo(item)
        .then((res) => {
          console.log(res);
          const user = new UserInfo({
            nameSelector: ".profile__name",
            jobSelector: ".profile__occupation",
            avatarSelector: null,
          });
          user.getUserInfo(res);
          user.setUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  ".profile__edit-button"
);

popupFormEdit.setEventListeners();

const popupAvatar = new PopupWithForm(
  {
    popupSelector: ".popup_type_avatar",
    formSelector: ".popup__form_avatar",
    handleFormSubmit: (item) => {
      api.patchAvatar(item).then((res) => {
        const user = new UserInfo({
          nameSelector: ".profile__name",
          jobSelector: ".profile__occupation",
          avatarSelector: ".profile__avatar",
        });
        user.getUserInfo(res);
        user.setUserInfo();
      });
    },
  },
  ".profile__avatar-button"
);

popupAvatar.setEventListeners();
