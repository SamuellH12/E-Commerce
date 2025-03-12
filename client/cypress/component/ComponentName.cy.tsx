describe('ComponentName.cy.tsx', () => {
  it('playground', () => {
    cy.visit('http://localhost:4000/payment');
    cy.get('body');
  })
})