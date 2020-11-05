describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'http://localhost:3003/api/users',
      {
        'username': 'root',
        'password': 'root',
        'name': 'Jukka Jalonen'
      })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginForm')
      .should('contain', 'username')
      .and('contain', 'password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('root')
      cy.get('#submitLogin').click()
      cy.contains('blogs')
      cy.contains('log out')
      cy.contains('add blog')
    })

    it('fails with wrong credentials', function () {
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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login',
        {
          'username': 'root',
          'password': 'root'
        })
        .then(({ body }) => {
          localStorage.setItem('loggedUser', JSON.stringify(body))
          cy.visit('http://localhost:3000')})
    })
    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#titleInput').type('Testblog')
      cy.get('#authorInput').type('Testjaebae')
      cy.get('#urlInput').type('viinaarannasta.ee')
      cy.get('#submitBlog').click()
      cy.contains('Testblog').should('exist')
      cy.contains('Testjaebae').should('exist')
      cy.contains('viinaarannasta.ee').should('not.exist')
    })
    describe('After adding a blog', function () {
      beforeEach(function () {
        cy.contains('add blog').click()
        cy.get('#titleInput').type('Testblog')
        cy.get('#authorInput').type('Testjaebae')
        cy.get('#urlInput').type('viinaarannasta.ee')
        cy.get('#submitBlog').click()
      })
      it('A blog can be liked', function () {
        cy
          .get('p')
          .contains('Testblog')
          .contains('view')
          .click()
        cy.contains('likes 0').should('exist')
        cy.contains('likes 1').should('not.exist')
        cy
          .get('p')
          .contains('Testblog')
          .parent()
          .find('button')
          .contains('like')
          .click()
        cy.contains('likes 0').should('not.exist')
        cy.contains('likes 1').should('exist')
      })
      it('A blog can be deleted', function () {
        cy
          .get('p')
          .contains('Testblog')
          .contains('view')
          .click()
        cy
          .contains('Testblog')
          .parent()
          .find('button')
          .contains('remove')
          .click()
        cy.contains('Testblog').should('not.exist')
        cy.contains('Testjaebae').should('not.exist')
      })
      it('blogs are sorted according to likes', function () {
        function likeBlog(blogName, n) {
          cy
            .get('p')
            .contains(blogName + ' by')
            .contains('view')
            .click()
          for (let i =0; i < n; i++) {
            cy
              .get('p')
              .contains(blogName + ' by')
              .parent()
              .find('button')
              .contains('like')
              .click()
          }
        }

        cy.contains('add blog').click()
        cy.get('#titleInput').type('Testblog1')
        cy.get('#authorInput').type('Testjaebae')
        cy.get('#urlInput').type('viinaarannasta.club')
        cy.get('#submitBlog').click()
        cy.contains('add blog').click()
        cy.get('#titleInput').type('Testblog2')
        cy.get('#authorInput').type('Testjaebae2')
        cy.get('#urlInput').type('viinaarannasta.ee')
        cy.get('#submitBlog').click()
        cy.contains('add blog').click()
        cy.get('#titleInput').type('Testblog3')
        cy.get('#authorInput').type('Testjaebae2')
        cy.get('#urlInput').type('viinaarannasta.us')
        cy.get('#submitBlog').click()
        cy.wait(1000)

        likeBlog('Testblog3', 5)
        likeBlog('Testblog1', 3)
        likeBlog('Testblog2', 7)
        likeBlog('Testblog', 2)

        let agg = []
        cy.get('p').each(asd => {
          asd.text().slice(0,8) === 'Testblog' && agg.push(asd.text().split(' ')[0])
        }).then(asjdfoasdpof => {
          expect(agg.toString()).to.equal(['Testblog2', 'Testblog3', 'Testblog1', 'Testblog'].toString())
        })
      })
    })
  })
})