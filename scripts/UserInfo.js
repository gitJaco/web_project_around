export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo(item) {
    this._userInfo = {
      name: item.name,
      about: item.about,
      avatar: item.avatar,
    };
    console.log(this._userInfo);
    return this._userInfo;
  }

  setUserInfo() {
    this._name.textContent = this._userInfo.name;
    this._job.textContent = this._userInfo.about;
    if (this._avatar) {
      this._avatar.style.backgroundImage = `url(${this._userInfo.avatar})`;
    }
  }
}
