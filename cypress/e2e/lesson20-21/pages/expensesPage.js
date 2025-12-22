import { BasePage } from './basePage';

export class ExpensesPage extends BasePage {
  constructor() {
    super();
  }
  get mileageInput() {
    return this.getElement('#addExpenseMileage');
  }
  get littersNumberInput() {
    return this.getElement('#addExpenseLiters');
  }
  get totalCostInput() {
    return this.getElement('#addExpenseTotalCost');
  }
  get addButton() {
    return this.getElement('[class="modal-content"] [class="btn btn-primary"]');
  }
  get expensesTable() {
    return this.getElement('[class="table expenses_table"] tbody tr td');
  }
  typeValueIntoInput(input, value) {
    input.clear();
    input.type(value);
  }
  shouldOpenExpensesPage() {
    this.urlShouldContain('/panel/expenses');
  }
  clickOnAddButton() {
    this.addButton.click();
  }
  shouldTableContainsRow(mileage, litres, cost) {
    this.expensesTable.eq(1).should('contain.text', mileage);
    this.expensesTable.eq(2).should('contain.text', litres);
    this.expensesTable.eq(3).should('contain.text', cost);
  }
}
