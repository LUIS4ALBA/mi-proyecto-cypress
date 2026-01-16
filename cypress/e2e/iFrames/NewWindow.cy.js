describe('Vamos a usar el comando personalizado para probar una nueva ventana',() => {

    it('Prueba de redirección en misma pestaña', () => {
    // 1. Preparas el "truco" para la URL a la que esperas ir
    cy.visitInSameTab('https://demoqa.com/sample')

    // 2. Haces clic en el botón que normalmente abriría otra pestaña
    cy.visit('https://demoqa.com/browser-windows')
    cy.get('#windowButton').click()

    // 3. Resultado: Cypress cargará la pagina en la misma pestaña y podrás validarlo
    cy.url().should('include', '/sample')
})
})