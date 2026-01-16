class FreeRangehome {


navigateToHome(){
    cy.visit('https://www.freerangetesters.com')
}

accederButton(){
    return cy.get('[data-testid="desktop-menu"] > .sc-dJkDXt')
}
}

export default FreeRangehome