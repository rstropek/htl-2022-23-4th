describe('TicTacToe app - level 4', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/level4');
  });

  it('one player after each other', () => {
    cy.get('[data-row="0"][data-col="0"]').click();
    cy.get('[data-row="0"][data-col="0"]').should('have.class', 'occupied-X');

    cy.get('[data-row="0"][data-col="1"]').click();
    cy.get('[data-row="0"][data-col="1"]').should('have.class', 'occupied-O');
  });

  it('detects winner winner', () => {
    for (let col = 0; col < 3; col++) {
      cy.get(`[data-row="0"][data-col="${col}"]`).click();
      if (col < 2) {
        cy.get(`[data-row="1"][data-col="${col}"]`).click();
      }
    }

    cy.get('[data-testid="winner"]').should('have.text', 'The winner is X');
  });

  it('can reset', () => {
    cy.get('[data-row="0"][data-col="0"]').click();
    cy.get('[data-testid="restart"]').click();
    cy.get('[data-row="0"][data-col="0"]').should(
      'not.have.class',
      'occupied-X'
    );
  });
});
