import 'cypress-axe'

describe('Pruebas de accesibilidad en el sitio TFRT', ()=> {
    it('Deberia cumplir con los estandares de accesibilidad', () => {
        cy.visit('https://www.freerangetesters.com')
        cy.injectAxe()
        cy.checkA11y()
        //Puede evaluar elementos individualmente por parametro, tambien configurar el grado de severidad a reportar
        //cy.checkA11y('[data-testid="header-container"] > .sc-cOTGOU > .sc-cSaEAk > :nth-child(2) > .sc-hORkcV')
    })
})