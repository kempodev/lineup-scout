describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('successfully loads, fills a match id, selects a team, displays player data', () => {
    cy.get('[data-test="matchIdInput"]').type('3314825')
    cy.get('[data-test="matchInputSubmit"]').click()
    cy.get(':nth-child(1) > .chakra-radio__label').click()
    cy.get('[data-test="teamSelectionSubmit"]').click()
    cy.get('[data-test="playerDataTable"]', { timeout: 6000 }).should('exist')
  })

  it('shows an error message', () => {
    cy.get('[data-test="matchIdInput"]').type('abc')
    cy.get('[data-test="matchInputSubmit"]').click()
    cy.get('[data-test="matchInputErrorMessage"]', { timeout: 10000 }).should(
      'have.text',
      'Tapahtui virhe: Match not found'
    )
  })
})
