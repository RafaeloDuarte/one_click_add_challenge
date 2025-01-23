it('should navigate to register page and register a user', () => {
  cy.visit('/register');

  cy.get('input[name="username"]').type('testuser');
  cy.get('input[name="email"]').type('test@example.com');
  cy.get('input[name="password"]').type('password123');
  cy.get('input[name="confirmPassword"]').type('password123');

  cy.get("button").contains("Registrar").click();
});