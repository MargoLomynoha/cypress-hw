import { ExpensesPage } from '../lesson20-21/pages/expensesPage';
import { GaragePage } from '../lesson20-21/pages/garagePage';
import { LoginPage } from '../lesson20-21/pages/loginPage';
import { registerCommands } from '../../support/commands';

describe('UI and API test', () => {
  it('UI and API test with intersepts', () => {
    // login to user account

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

    // add car to garage with intersept( check status code and get car Id)

    let garagePage = new GaragePage();
    let carId;
    cy.intercept('POST', '/api/cars').as('addCar');
    garagePage.clickOnButton(garagePage.addCarButton);
    garagePage.chooseBrandOption('Ford');
    garagePage.chooseModelOption('Fusion');
    garagePage.typeKmIntoMileageInput(garagePage.carMileageInput, '10');
    garagePage.clickOnButton(garagePage.addButton);

    cy.wait('@addCar').then(({ response }) => {
      expect(response, 'response exists').to.exist;
      expect(response.statusCode).to.eq(201);
      carId = response.body.data.id;
    });

    cy.then(() => {
      expect(carId).to.exist;
      cy.request('GET', `/api/cars/${carId}`).its('status').should('eq', 200);
    });

    // get car list

    cy.request({
      method: 'GET',
      url: 'api/cars',
    }).then((response) => {
      expect(response.body.data[0].id).eq(carId);
      carsArray = response.body.data;
    });

    // add expense to car with custom command

    cy.then(() => {
      expect(carId).to.exist;
      registerCommands();
      cy.createExpense(carId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.carId).to.eq(carId);
        expect(response.body.data.mileage).to.eq(111);
        expect(response.body.data.liters).to.eq(15);
        expect(response.body.data.totalCost).to.eq(20);

        carsArray = response.body.data;
      });
    });
    let expense = new ExpensesPage();
    garagePage.clickOnButton(garagePage.expensesNavButton);
    expense.shouldOpenExpensesPage();
    expense.shouldTableContainsRow('111', '15', '20');

    // get car list and remove all

    let carsArray;

    cy.request({
      method: 'GET',
      url: '/api/cars',
    }).then((response) => {
      expect(response.status).to.eq(200);
      carsArray = response.body.data;

      carsArray.forEach((car) => {
        cy.request({
          method: 'DELETE',
          url: `/api/cars/${car.id}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});
