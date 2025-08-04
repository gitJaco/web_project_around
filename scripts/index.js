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

function createCard(data) {
  const card = new Card({
    name: data.name,
    link: data.link,
    id: data._id,
    isLiked: data.isLiked,
    handleCardClick: (item) => {
      const image = new PopupWithImage(".popup_type_image");
      image.open(item);
      image.setEventListeners();
    },
    handleTrash: (element, id) => {
      const popupConfirmation = new PopupWithConfirmation(
        ".popup_type_delete",
        element,
        () => {
          api
            .deleteCard(id)
            .then(() => {
              card.remove();
            })
            .catch((err) => console.log(err));
        }
      );
      popupConfirmation.setEventListeners();
    },
    handleLike: (id, isLiked) => {
      const request = isLiked ? api.dislikeCard(id) : api.likeCard(id);
      request
        .then((res) => {
          card.updateLikeState(res);
        })
        .catch((err) => console.log(err));
    },
  });

  return card;
}

api
  .getInitialCards()
  .then((res) => {
    const cardList = new Section(
      {
        data: res,
        renderer: (item) => {
          const card = createCard(item);
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
              const card = createCard(res);
              const cardElement = card.generateCard();
              cardList.addItemEnd(cardElement);
            })
            .catch((err) => console.log(err));
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
