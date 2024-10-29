describe('template spec', () => {
    it('user should be able to register', () => {
      cy.visit('/')
      cy.wait(1000); 

      cy.get('a').contains('Create account').click()
      // fill in the form
      cy.get('input[name="username"]').type('Operator4')
      cy.get('input[name="email"]').type('op4@email.com')
      cy.get('input[name="password"]').type('password')
      cy.wait(1000); 
      // submit the form
      cy.get('button').contains('Sign Up').click()
      cy.wait(2000); 
      // Wait for the dashboard to load, then click on the "Users" sidebar link
      cy.get('input[type="username"]').type('Operator4')
      cy.get('input[type="password"]').type('password')
      cy.wait(1000); 
      // submit the form
      cy.get('button').contains('Login').click()
      cy.wait(1000); 

    }) 
  })