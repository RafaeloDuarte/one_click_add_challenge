describe("Tela de Login", () => {
  it("Renderiza o formulário corretamente", () => {
    cy.visit("/");

    cy.get("label").contains("Email").should("exist");
    cy.get("label").contains("Senha").should("exist");
    cy.get("button").contains("Entrar").should("exist");
  });

  it("Exibe erros de validação para campos vazios", () => {
    cy.visit("/");

    cy.get("button").contains("Entrar").click();

    cy.contains("Email é obrigatório").should("be.visible");
    cy.contains("Senha é obrigatória").should("be.visible");
  });
});
