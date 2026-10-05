describe('Login Form', () => {
  it('Gecerli bilgilerle giris yapinca Success sayfasi acilir', () => {
    cy.visit('http://localhost:5174');
    cy.get('[data-cy="email"]').type('john@doe.com');
    cy.get('[data-cy="password"]').type('asdasd');
    cy.get('[data-cy="terms"]').click();
    cy.get('[data-cy="submit"]').click();
    
    cy.url().should('include', '/success');
    cy.contains('Login Successful')
  })


it('Yanlis email ile hata mesaji cikar', () => {
  cy.visit('http://localhost:5174');
  cy.get('[data-cy="email"]').type('johndoe.com');
  cy.get('[data-cy="password"]').type('asdasd');
  cy.get('[data-cy="terms"]').click();

  cy.get('[data-cy="error"]').should('have.length', 1);
  cy.get('[data-cy="error"]').should('have.text',"Please enter a valid email address");
  cy.get('[data-cy="submit"]').should('be.disabled')
  })


it('Yanlis email ve sifre ile hata mesaji cikar', () => {
  cy.visit('http://localhost:5174');
  cy.get('[data-cy="email"]').type('johndoe.com');
  cy.get('[data-cy="password"]').type('asd');
  cy.get('[data-cy="terms"]').click();

  cy.get('[data-cy="error"]').should('have.length', 2);
  cy.get('[data-cy="error"]').should('contain.text',"Please enter a valid email address");
  cy.get('[data-cy="error"]').should('contain.text',"Password must be at least 4 characters long");
  cy.get('[data-cy="submit"]').should('be.disabled');
  })


  it('Onaylanmamis Terms ile pasif buton cikar', () => {
    cy.visit('http://localhost:5174');
    cy.get('[data-cy="email"]').type('john@doe.com');
    cy.get('[data-cy="password"]').type('asdasd');

    cy.get('[data-cy="terms"]').should('not.be.checked');
    cy.get('[data-cy="submit"]').should('be.disabled');

  })
})