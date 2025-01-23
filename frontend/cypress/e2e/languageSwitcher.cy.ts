describe("Language Switcher Button", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("deve alternar entre os idiomas ao clicar no botão", () => {
    cy.get("button").contains("English").click();
    cy.get("button").contains("English").click();
    cy.get("button").contains("Português");
  });

  it("deve mudar o conteúdo da página ao alternar os idiomas", () => {
    cy.get("button").contains("English").click();
    cy.get("button").contains("English").click();

    cy.get("h2").should("contain.text", "Login");

    cy.get("button").contains("Português").click();

    cy.get("h2").should("contain.text", "Entrar");
  });
});
