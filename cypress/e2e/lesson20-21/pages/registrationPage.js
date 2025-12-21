import { BasePage } from './basePage';

export class RegistrationPage extends BasePage {
  constructor() {
    super('/', { username: 'guest', password: 'welcome2qauto' });
  }
  openRegistrationForm() {
    this.getElement('[class^="hero-descriptor_btn"]')
      .contains('Sign up')
      .click();
  }
  checkRegistrationFormShouldBeVisible() {
    this.getElement('[class=modal-content]').should('be.visible');
  }
  get userNameInput() {
    return this.getElement('#signupName');
  }
  get userNameError() {
    return this.getElement('[id=signupName] + div p');
  }
  get userLastNameInput() {
    return this.getElement('#signupLastName');
  }
  get userLastNameError() {
    return this.getElement('[id=signupLastName] + div p');
  }
  get userEmailInput() {
    return this.getElement('#signupEmail');
  }
  get userEmailError() {
    return this.getElement('[id=signupEmail] + div p');
  }
  get userPasswordInput() {
    return this.getElement('#signupPassword');
  }
  get userPasswordError() {
    return this.getElement('[id=signupPassword] + div p');
  }
  get userReenterPasswordInput() {
    return this.getElement('#signupRepeatPassword');
  }
  get userReenterPasswordError() {
    return this.getElement('[id=signupRepeatPassword] + div p');
  }
  get registerButton() {
    return this.getElement('[class="btn btn-primary"]');
  }
  get formErrorMessage() {
    return this.getElement('app-signup-modal p');
  }

  typeTextIntoInput(input, text) {
    input.clear();
    input.type(text);
  }
  typeSensitiveTextIntoInput(input, value) {
    input.clear();
    input.type(value, { sensitive: true });
  }
  checkInputHasTypePassword(input) {
    input.should('have.attr', 'type', 'password');
  }
  inputFeedbackHasMessage(element, expectedMessage) {
    element.should('have.text', expectedMessage);
  }

  shouldRegisterButtonBeEnabled() {
    this.registerButton.should('not.be.disabled');
  }

  shouldRegisterButtonBeDisabled() {
    this.registerButton.should('be.disabled');
  }
  clickOnRegisterButton() {
    this.registerButton.click();
  }
  inputShouldBeVisible(input) {
    input.should('be.visible');
  }
  checkErrorMessageDoesNotExist(errorMessageElement) {
    errorMessageElement.should('not.exist');
  }
  setInputFocused(input) {
    input.focus();
  }
  setInputBlurred(input) {
    input.blur();
  }
  inputShouldHaveRedBorder(input) {
    input.should('have.class', 'is-invalid');
  }
  shouldOpenGaragePage() {
    this.urlShouldContain('panel/garage');
  }
}
