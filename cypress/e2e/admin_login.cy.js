describe('template spec', () => {
  it('user should be able to log in', () => {
    cy.visit('/')
    cy.wait(1000); 
    // fill in the form
    cy.get('input[type="username"]').type('admin')
    cy.get('input[type="password"]').type('admin123')
    cy.wait(1000); 
    // submit the form
    cy.get('button').contains('Login').click()
    cy.wait(2000); 
    // Wait for the dashboard to load, then click on the "Users" sidebar link
    cy.contains('Users').click();
    cy.wait(1000); 
    // Assert that we are on the User Management page
    cy.url().should('include', '/users');
    cy.wait(1000); 
    // Click on the first username link in the table
    // cy.get('table').find('a').first().click();
    cy.get('table') // Select the table
      .contains('a', 'boom') // Find the anchor tag that contains 'boom'
      .click(); // Optionally click on it if needed
    cy.wait(1000); 
    // Verify we are on the user details page
    // Assuming the URL changes to something like /users/:userId or has 'details' in the URL
    cy.url().should('include', '/users/');
    cy.contains('Assign Role').click();

    cy.get('select').should('be.visible').select('OPERATOR');

    cy.get('button').contains('Assign').click();
    cy.wait(1000); 
    cy.get('button').contains('Back').click();
  }) 
})