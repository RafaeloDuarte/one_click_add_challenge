describe('Página inicial', () => {
  it('deve exibir o título da página', () => {
    cy.visit('/');
    cy.contains('Vite + React').should('be.visible');
  });
});