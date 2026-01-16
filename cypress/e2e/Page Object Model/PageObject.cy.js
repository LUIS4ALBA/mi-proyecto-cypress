import FreeRangehome from "../../pages/FreeRangeHome"

const home = new FreeRangehome

describe('Ejemplo de POM en la web Free Range Testers', () => {

    it('El botón Acceder existe', () => {
        
        home.navigateToHome()
        home.accederButton().should('exist')
    })
})