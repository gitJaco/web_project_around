import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    super.open();
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__image-title");
    this._image.src = data.link;
    this._title.textContent = data.name;
  }
}
