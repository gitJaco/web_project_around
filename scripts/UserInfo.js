export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo(item) {
    this._userInfo = { name: item.name, job: item.job };
    return this._userInfo;
  }

  setUserInfo() {
    this._name.textContent = this._userInfo.name;
    this._job.textContent = this._userInfo.job;
  }
}
