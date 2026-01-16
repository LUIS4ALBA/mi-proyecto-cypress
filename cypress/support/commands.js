// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('iframe', { prevSubject: 'element'}, ($iframe, selector) => {
    
    Cypress.log({
        name: "iframe",
        consoleProps(){
            return{
                iframe:$iframe,
            }
        }
    })
    return new Cypress.Promise(resolve =>{
        resolve($iframe.contents().find(selector))
    })
})

//comando que hace el login a la aplicacion bajo test
Cypress.Commands.add('login', () => {
    cy.visit('https://the-internet.herokuapp.com/')
        cy.request({
            method: 'POST',
            url: '/authenticate',
            form: true,
            body: {
                username: 'tomsmith',
                password: 'SuperSecretPassword!'
            }
        })

        cy.getCookie('rack.session').should('exist')
        cy.visit('https://the-internet.herokuapp.com/secure')
})


//Cuando una aplicación hace un window.open(url), normalmente se abre una pestaña nueva. 
//Como Cypress no puede saltar a esa pestaña nueva, este comando "intercepta" esa acción 
// para que la página se abra en la misma pestaña donde ya estás trabajando.
Cypress.Commands.add('visitInSameTab', (url) => {
    cy.on('window:before:load',(win)=> {
        cy.stub(win,'open').as('windowOpen').callsFake(() => {
            cy.visit(url)
        })
    })
} )