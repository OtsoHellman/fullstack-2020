describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'http://localhost:3003/api/users',
      {
        'username': 'root',
        'password': 'root',
        'name': 'Jukka Jalonen'
      })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
      .should('contain', 'username')
      .and('contain', 'password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('root')
      cy.get('#submitLogin').click()
      cy.contains('blogs')
      cy.contains('log out')
      cy.contains('add blog')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('not root')
      cy.get('#submitLogin').click()
      cy.contains('blogs').should('not.exist')
      cy.contains('log out').should('not.exist')
      cy.contains('add blog').should('not.exist')
      cy.get('#loginForm')
        .should('contain', 'username')
        .and('contain', 'password')
    })
  })
})