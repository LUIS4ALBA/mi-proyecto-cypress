describe('Home de www.freerangetesters.com', () => {

    beforeEach(()=> {
        cy.visit('https://www.freerangetesters.com')
    })


    it('Should have a title', () => {
        cy.title().should('include','Free Range Testers');
        //cy.contains('Acceder')
})

    it('Hay 14 cursos en la página',() => {
        cy.xpath('//*[@id="page_header"]/div/section/div/header/nav/ul/li[2]/a').click()
        cy.title().should('include','Cursos')
        cy.get('[data-react-component="creator_ui/section_adapters/Products"] > .sc-dVBluf > [data-testid="container"] > [data-testid="grid"] .sc-gOUBbZ').should('have.length',14)

    })

    it('El campo correo electronico tiene la clase .form-control' ,() => {
        cy.get('[data-testid="desktop-menu"] > .sc-dJkDXt').click()
        cy.title().should('include','Acceder a Free Range Testers')
        cy.get('#email').should('have.class','form-control')
    })

    it('Hay un link llamado Restablécela aquí' ,() => {
        cy.get('[data-testid="desktop-menu"] > .sc-dJkDXt').click()
        cy.title().should('include','Acceder a Free Range Testers')
        cy.get('u > .text-muted').should('have.text','Restablécela aquí')
    })

    it('Existe un boton de Inicio de sesión',() => {
        cy.get('[data-testid="desktop-menu"] > .sc-dJkDXt').click()
        cy.log('Verifica que existe un botón de Inicio de sesión')
        cy.get('.btn').should('be.visible')
    })

    it('El boton de Inicio de sesión está deshabilitado',() => {
        cy.get('[data-testid="desktop-menu"] > .sc-dJkDXt').click()
        cy.get('.btn').should('be.disabled')
    })
})