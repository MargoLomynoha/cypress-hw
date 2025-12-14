export class BasePage {
  constructor(url, auth) {
    this.url = url;
    this.auth = auth;

    cy.visit(this.url, {
      auth: this.auth,
    });
  }
  getElement(selector) {
    return cy.get(selector);
  }
  elementExist(element){
    element.should('be.visible');
  }
  elementDoesNotExist(element){
    element.should('not.exist');
  }
  urlShouldContain(path){
    cy.url().should('include', path)
  }
}
