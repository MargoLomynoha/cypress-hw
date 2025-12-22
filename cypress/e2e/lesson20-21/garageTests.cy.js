import { ExpensesPage } from './pages/expensesPage';
import { GaragePage } from './pages/garagePage';
import { LoginPage } from './pages/loginPage';

describe('Garage smoke test  ', () => {
  it('should add new car, update expense and successfully remove car', () => {
    let logPage = new LoginPage();
    logPage.openLoginForm();
    logPage.typeDataIntoInputs(
      logPage.userEmailInput,
      Cypress.env('USER_EMAIL')
    );
    logPage.typeSensitiveValueIntoInputs(
      logPage.userPasswordInput,
      Cypress.env('USER_PASSWORD')
    );
    logPage.clickOnLoginButton();
    logPage.shouldOpenGaragePage();

    let garagePage = new GaragePage();

    garagePage.verifyGarageEmpty();
    garagePage.clickOnButton(garagePage.addCarButton);
    garagePage.chooseBrandOption('Ford');
    garagePage.chooseModelOption('Fusion');
    garagePage.typeKmIntoMileageInput(garagePage.carMileageInput, '10');
    garagePage.clickOnButton(garagePage.addButton);
    garagePage.verifyGarageNotEmpty();
    garagePage.shouldHaveNCars(1);

    garagePage.clickOnButton(garagePage.addExpenseButton);
    let expense = new ExpensesPage();
    expense.typeValueIntoInput(expense.mileageInput, '30');
    expense.typeValueIntoInput(expense.littersNumberInput, '10');
    expense.typeValueIntoInput(expense.totalCostInput, '15');
    expense.clickOnAddButton();
    expense.shouldOpenExpensesPage();
    expense.shouldTableContainsRow('30', '10', '15');
    garagePage.clickOnButton(garagePage.garageNavButton);

    garagePage.clickOnButton(garagePage.editCarButton);
    garagePage.clickOnButton(garagePage.removeCarButton);
    garagePage.clickOnButton(garagePage.removeConfirmationButton);
    garagePage.verifyGarageEmpty();
  });
});
