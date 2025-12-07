describe('Testing hero section', () => {
  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  });
  it('auth and sign up form with valid values', () => {
    cy.get('[class^="hero-descriptor_btn"]').contains('Sign up').click();
    // Registration form should be visible
    cy.get('[class=modal-content]').should('be.visible');
    //Register button should be disabled
    cy.get('[class="btn btn-primary"]').should('be.disabled');
    // Enter user info into form
    cy.get('#signupName').type('Name').should('have.value', 'Name');
    cy.get('#signupLastName').type('LastName').should('have.value', 'LastName');
    cy.get('#signupEmail')
      .type('admin@dome.com')
      .should('have.value', 'admin@dome.com');
    cy.get('#signupPassword')
      .type('12345Password')
      .should('have.attr', 'type', 'password');
    cy.get('#signupRepeatPassword')
      .type('12345Password')
      .should('have.attr', 'type', 'password');
    // Check that form is valid
    cy.get('[class=invalid-feedback]').should('not.exist');
    //  Check that "Register" button is enabled
    cy.get('[class="btn btn-primary"]').should('not.be.disabled');
  });

  it('auth and sign up form with invalid values', () => {
    cy.get('[class^="hero-descriptor_btn"]').contains('Sign up').click();
    // Registration form should be visible
    cy.get('[class=modal-content]').should('be.visible');
    //Register button should be disabled
    cy.get('[class="btn btn-primary"]').should('be.disabled');
    // Enter user invalid info into form
    cy.get('#signupName').type('&^&*').should('have.value', '&^&*');
    cy.get('#signupLastName').type('&^&*').should('have.value', '&^&*');
    cy.get('#signupEmail').type('&^&*').should('have.value', '&^&*');
    cy.get('#signupPassword')
      .type('123')
      .should('have.attr', 'type', 'password');
    cy.get('#signupRepeatPassword')
      .type('12345')
      .should('have.attr', 'type', 'password');
    cy.get('#signupRepeatPassword').blur();
    // Check that form with invalid values has error messages
    const errorMessages = [
      'Name is invalid',
      'Last name is invalid',
      'Email is incorrect',
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    ];
    cy.get('[class=form-group]')
      .should('have.length', 5)
      .each(($group, index) => {
        const expectedMessage = errorMessages[index];
        cy.wrap($group).within(() => {
          cy.get('[class=invalid-feedback] p')
            .should('be.visible')
            .and('have.text', expectedMessage);
        });
      });

    //  Check that "Register" button is disabled
    cy.get('[class="btn btn-primary"]').should('be.disabled');
  });
});

describe('Testing footer', () => {
  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  });
  it('auth and go to school site from footer', () => {
    // Click on "ithillel.ua" logo in the footer should open related link
    cy.get('a[href="https://ithillel.ua"]')
      .invoke('removeAttr', 'target')
      .click();
    cy.title().should(
      'eq',
      "Комп'ютерна школа Hillel Online: Курси IT-технологій"
    );
  });

  it('auth and check social links', () => {
    // Check social links
    const socialLinkUrls = [
      'https://www.facebook.com/Hillel.IT.School',
      'https://t.me/ithillel_kyiv',
      'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
      'https://www.instagram.com/hillel_itschool/',
      'https://www.linkedin.com/school/ithillel/',
    ];
    cy.get('[class="contacts_socials socials"] a')
      .should('have.length', 5)
      .each(($a, index) => {
        const expectedlink = socialLinkUrls[index];
        cy.wrap($a).should('have.attr', 'href', expectedlink);
      });
  });
});
