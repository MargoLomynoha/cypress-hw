import { RegistrationPage } from './pages/registrationPage';
import { faker } from '@faker-js/faker';

let regPage;
describe('Registration modal', () => {
  it('check is modal form correct', () => {
    regPage = new RegistrationPage();
    regPage.openRegistrationForm();
    // Registration form should be visible
    regPage.checkRegistrationFormShouldBeVisible();
    // check that all needed inputs exist
    regPage.inputShouldBeVisible(regPage.userNameInput);
    regPage.inputShouldBeVisible(regPage.userLastNameInput);
    regPage.inputShouldBeVisible(regPage.userEmailInput);
    regPage.inputShouldBeVisible(regPage.userPasswordInput);
    regPage.inputShouldBeVisible(regPage.userReenterPasswordInput);
    //Register button should be disabled
    regPage.shouldRegisterButtonBeDisabled();
    // check that form doesn't have error messages
    regPage.checkErrorMessageDoesNotExist(regPage.userNameError);
    regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);
    regPage.checkErrorMessageDoesNotExist(regPage.userEmailError);
    regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
    regPage.checkErrorMessageDoesNotExist(regPage.userReenterPasswordError);
  });
});

describe('Required input validation', () => {
  beforeEach(() => {
    regPage = new RegistrationPage();
    regPage.openRegistrationForm();
  });

  it('Inputs have "input required" error messages if inputs are empty', () => {
    // set focus on the input to display the error
    regPage.setInputFocused(regPage.userNameInput);
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.setInputFocused(regPage.userLastNameInput);
    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.setInputFocused(regPage.userEmailInput);
    regPage.setInputBlurred(regPage.userEmailInput);
    regPage.setInputFocused(regPage.userPasswordInput);
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.setInputFocused(regPage.userReenterPasswordInput);
    regPage.setInputBlurred(regPage.userReenterPasswordInput);

    // check that errors are displayed and inputs have red borders
    regPage.inputFeedbackHasMessage(regPage.userNameError, 'Name required');
    regPage.inputShouldHaveRedBorder(regPage.userNameInput);
    regPage.inputFeedbackHasMessage(
      regPage.userLastNameError,
      'Last name required'
    );

    regPage.inputShouldHaveRedBorder(regPage.userLastNameInput);
    regPage.inputFeedbackHasMessage(regPage.userEmailError, 'Email required');
    regPage.inputShouldHaveRedBorder(regPage.userEmailInput);
    regPage.inputFeedbackHasMessage(
      regPage.userPasswordError,
      'Password required'
    );

    regPage.inputShouldHaveRedBorder(regPage.userPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userReenterPasswordError,
      'Re-enter password required'
    );

    regPage.inputShouldHaveRedBorder(regPage.userReenterPasswordInput);
    //Register button should be disabled
    regPage.shouldRegisterButtonBeDisabled();
  });

  it('Name input validation', () => {
    regPage.typeTextIntoInput(regPage.userNameInput, 'a');
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.inputFeedbackHasMessage(
      regPage.userNameError,
      'Name has to be from 2 to 20 characters long'
    );

    regPage.typeTextIntoInput(regPage.userNameInput, 'ItIsaLongUserFirstName');
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.inputFeedbackHasMessage(
      regPage.userNameError,
      'Name has to be from 2 to 20 characters long'
    );

    regPage.typeTextIntoInput(regPage.userNameInput, 'текст');
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.inputFeedbackHasMessage(regPage.userNameError, 'Name is invalid');

    regPage.typeTextIntoInput(regPage.userNameInput, 'ab');
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userNameError);

    regPage.typeTextIntoInput(regPage.userNameInput, 'FirstName');
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userNameError);

    regPage.typeTextIntoInput(regPage.userNameInput, 'qwertyuiopasdfghjklz');
    regPage.setInputBlurred(regPage.userNameInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userNameError);
  });

  it('Last name input validation', () => {
    regPage.typeTextIntoInput(regPage.userLastNameInput, 'a');
    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.inputFeedbackHasMessage(
      regPage.userLastNameError,
      'Last name has to be from 2 to 20 characters long'
    );

    regPage.typeTextIntoInput(
      regPage.userLastNameInput,
      'ItIsaLongUserLastName'
    );

    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.inputFeedbackHasMessage(
      regPage.userLastNameError,
      'Last name has to be from 2 to 20 characters long'
    );

    regPage.typeTextIntoInput(regPage.userLastNameInput, 'текст');
    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.inputFeedbackHasMessage(
      regPage.userLastNameError,
      'Last name is invalid'
    );

    regPage.typeTextIntoInput(regPage.userLastNameInput, 'ab');
    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);

    regPage.typeTextIntoInput(regPage.userLastNameInput, 'LastName');
    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);

    regPage.typeTextIntoInput(
      regPage.userLastNameInput,
      'qwertyuiopasdfghjklz'
    );
    regPage.setInputBlurred(regPage.userLastNameInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);
  });

  it('Email input validation', () => {
    regPage.typeTextIntoInput(regPage.userEmailInput, 'ab');
    regPage.setInputBlurred(regPage.userEmailInput);
    regPage.inputFeedbackHasMessage(
      regPage.userEmailError,
      'Email is incorrect'
    );

    regPage.typeTextIntoInput(regPage.userEmailInput, ' ');
    regPage.setInputBlurred(regPage.userEmailInput);
    regPage.inputFeedbackHasMessage(
      regPage.userEmailError,
      'Email is incorrect'
    );

    regPage.typeTextIntoInput(regPage.userEmailInput, '@');
    regPage.setInputBlurred(regPage.userEmailInput);
    regPage.inputFeedbackHasMessage(
      regPage.userEmailError,
      'Email is incorrect'
    );

    regPage.typeTextIntoInput(regPage.userEmailInput, 'test@test.com');
    regPage.setInputBlurred(regPage.userEmailInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userEmailError);
  });

  it('Password input validation', () => {
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '1');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userPasswordError,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );

    // typing 16 symbols in password input
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '123456789zxcvbNm');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userPasswordError,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );

    // typing the valid password
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345Margo');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);

    // typing the password without a number
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, 'MargoPassword');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userPasswordError,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );

    // typing the password without a capital letter
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345margo');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userPasswordError,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );

    // typing the password without small letters
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345MARGO');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userPasswordError,
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  it('Re-enter password input validation', () => {
    // check when password and re-entered password inputs are not matched
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345Margo');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
    regPage.typeSensitiveTextIntoInput(
      regPage.userReenterPasswordInput,
      '12345MargoPass'
    );
    regPage.setInputBlurred(regPage.userReenterPasswordInput);
    regPage.inputFeedbackHasMessage(
      regPage.userReenterPasswordError,
      'Passwords do not match'
    );

    // check when password and re-entered password inputs are matched
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345Margo');
    regPage.setInputBlurred(regPage.userPasswordInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
    regPage.typeSensitiveTextIntoInput(regPage.userReenterPasswordInput, '12345Margo');
    regPage.setInputBlurred(regPage.userReenterPasswordInput);
    regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
  });

  it('Button behavior with valid values but this user is already existed', () => {
    regPage.typeTextIntoInput(regPage.userNameInput, 'FirstName');
    regPage.typeTextIntoInput(regPage.userLastNameInput, 'LastName');
    regPage.typeTextIntoInput(regPage.userEmailInput, 'test@test.com');
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345Margo');
    regPage.typeSensitiveTextIntoInput(regPage.userReenterPasswordInput, '12345Margo');
    regPage.shouldRegisterButtonBeEnabled();
    regPage.elementDoesNotExist(regPage.formErrorMessage);
    regPage.clickOnRegisterButton();
    regPage.elementExist(regPage.formErrorMessage);
  });

  it('Successfully created a user with valid data and a unique email', ()=>{
    regPage.typeTextIntoInput(regPage.userNameInput, 'FirstName');
    regPage.typeTextIntoInput(regPage.userLastNameInput, 'LastName');
    regPage.typeTextIntoInput(regPage.userEmailInput, faker.internet.email());
    regPage.typeSensitiveTextIntoInput(regPage.userPasswordInput, '12345Margo');
    regPage.typeSensitiveTextIntoInput(regPage.userReenterPasswordInput, '12345Margo');
    regPage.shouldRegisterButtonBeEnabled();
    regPage.elementDoesNotExist(regPage.formErrorMessage);
    regPage.clickOnRegisterButton();
    regPage.shouldOpenGaragePage();
  })
});
