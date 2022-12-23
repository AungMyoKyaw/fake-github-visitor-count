import axios from 'axios';
import UserAgent from 'user-agents';
import ora from 'ora';

class GithubVisitor {
  constructor(username, count) {
    this.badgeUrl = 'https://shields-io-visitor-counter.herokuapp.com/badge?page=';
    this.username = username;
    this.count = count;
    this.fakedCount = 0;
  }

  get spinnerText() {
    const { count, fakedCount } = this;
    const spinnerText = `Faking Github Visitor Count ${fakedCount}/${count}`;
    return spinnerText;
  }

  get succeedSpinnerText() {
    const { count, fakedCount } = this;
    const spinnerText = `Faked Github Visitor Count => ${fakedCount}`;
    return spinnerText;
  }

  initSpinner() {
    this.spinner = ora(this.spinnerText).start();
  }

  tickSpinner() {
    this.spinner.text = this.spinnerText;
  }

  async batchGET(username, count) {
    const badgeUrlForUser = `${this.badgeUrl}${username}`;
    for (let i = 0; i < count; i++) {
      const userAgent = new UserAgent();
      const res = await axios.get(badgeUrlForUser, {
        headers: { 'User-Agent': userAgent.toString() },
      });
      this.fakedCount += 1;
      this.tickSpinner();
    }
    this.spinner.succeed(this.succeedSpinnerText);
  }

  async fake() {
    const { username, count } = this;
    this.initSpinner();
    await this.batchGET(username, count);
  }
}

export { GithubVisitor };
