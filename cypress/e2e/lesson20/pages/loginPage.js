import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor() {
    super('/', { username: 'guest', password: 'welcome2qauto' });
  }
  get userEmailInput() {
    return this.getElement('#signinEmail');
  }
  get userPasswordInput() {
    return this.getElement('#signinPassword');
  }
  get loginButton() {
    return this.getElement('[class="btn btn-primary"]');
  }
  openLoginForm() {
    this.getElement('[class="btn btn-outline-white header_signin"]')
      .contains('Sign In')
      .click();
  }
  typeDataIntoInputs(input, value) {
    input.type(value);
  }
  typeSensitiveValueIntoInputs(input, value) {
    input.type(value, { sensitive: true });
  }
  clickOnLoginButton() {
    this.loginButton.click();
  }
  shouldOpenGaragePage() {
    this.urlShouldContain('panel/garage');
  }
}
