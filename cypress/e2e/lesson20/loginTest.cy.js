import { LoginPage } from './pages/loginPage';

describe('login', () => {
  it('login', () => {
    let logPage = new LoginPage();
    logPage.openLoginForm();
    logPage.typeDataIntoInputs(
      logPage.userEmailInput,
      'Marcella_Skiles@gmail.com'
    );
    logPage.typeSensitiveValueIntoInputs(logPage.userPasswordInput, '12345Margo');
    logPage.clickOnLoginButton();
    logPage.shouldOpenGaragePage();
  });
});
