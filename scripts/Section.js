export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItemEnd(element) {
    this._containerSelector.append(element);
  }

  addItemStart(element) {
    this._containerSelector.prepend(element);
  }
}
