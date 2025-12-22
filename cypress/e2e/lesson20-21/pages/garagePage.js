import { BasePage } from './basePage';

export class GaragePage extends BasePage {
  constructor() {
    super();
  }
  get emptyGaragePageMessage() {
    return this.getElement('[class="h3 panel-empty_message"]');
  }
  get addCarButton() {
    return this.getElement('[class="panel-page"] [class="btn btn-primary"]');
  }
  get carBrandSelector() {
    return this.getElement('#addCarBrand');
  }
  get carModelSelector() {
    return this.getElement('#addCarModel');
  }
  get carMileageInput() {
    return this.getElement('#addCarMileage');
  }
  get addButton() {
    return this.getElement(
      '[class="btn btn-secondary"] + [class="btn btn-primary"]'
    );
  }
  get carItem() {
    return this.getElement('[class="car-item"]');
  }
  get addExpenseButton() {
    return this.getElement('[class="car_add-expense btn btn-success"]');
  }
  get editCarButton() {
    return this.getElement('[class="icon icon-edit"]');
  }
  get removeCarButton() {
    return this.getElement('[class="btn btn-outline-danger"]');
  }
  get removeConfirmationButton() {
    return this.getElement('[class="btn btn-danger"]');
  }
  get garageNavButton() {
    return this.getElement(
      '[class="btn btn-white btn-sidebar sidebar_btn"][href^="/panel/garage"]'
    );
  }
  get expensesNavButton() {
    return this.getElement(
      '[class="btn btn-white btn-sidebar sidebar_btn"][href^="/panel/expenses"]'
    );
  }
  verifyGarageEmpty() {
    this.emptyGaragePageMessage.should('be.visible');
  }
  verifyGarageNotEmpty() {
    this.emptyGaragePageMessage.should('not.exist');
  }
  chooseBrandOption(text) {
    this.carBrandSelector.select(text);
  }
  chooseModelOption(text) {
    this.carModelSelector.select(text);
  }
  typeKmIntoMileageInput(input, value) {
    input.type(value);
  }
  shouldHaveNCars(quantity) {
    this.carItem.should('have.length', quantity);
  }
  openEditCartModal() {
    this.editCarButton.click();
  }
  clickOnButton(button) {
    button.click();
  }
}
