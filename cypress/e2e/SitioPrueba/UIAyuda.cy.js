describe('Pruebas sobre la UI', () => {

    beforeEach(()=> {
        cy.visit('https://the-internet.herokuapp.com')
    })

//     it('Probar esperas', () => {
//         cy.wait(10000)
//         cy.get(':nth-child(5) > a').click()
        
// })

        // it('Nueva pestaña', () => {
        //         cy.get(':nth-child(33) > a').click()
        //         cy.get('.example > a').invoke('removeAttr','target').click() //remueve atributo para que permanezca en la misma ventana
        //         cy.get('h3').should('have.text','New Window')      
        // })

        //invoke nos permite invocar funciones para dejar la pagina en condiciones que necesitamos para testear, ejm habilitar un btn

        // it('Primer y ultimo elemento', () => {
        //         cy.get(':nth-child(12) > a').click()
        //         cy.get('img').first().should('be.visible')
                  
        // })

        // it('Agregar y remover elemento', () => {
        //         cy.get('ul > :nth-child(2) > a').click()
        //         cy.get('button').click()
        //         cy.get('.added-manually').should('be.visible')
                  
        // })

        // it('Ejemplo de escritura', () => {
        //     cy.contains('Form Authentication').click()
        //     cy.get('#username').type('tomsmith')
        //     cy.get('#password').type('SuperSecretPassword!')
        //     cy.get('.radius').click()
        //     cy.get('#flash').should('be.visible')
        //     cy.get('#flash').contains('You logged into a secure area!')
        // })

        //  it('Check y Uncheck', () => {
        //     cy.contains('Checkboxes').click()
        //     cy.get('[checked=""]').uncheck()
        //     cy.get('#checkboxes > :nth-child(1)').check()

        // })

        // it('Elegir de un Dropdown', () => {
        //     cy.contains('Dropdown').click()
        //     cy.get('#dropdown').select('Option 2')
        //     cy.get('#dropdown').select('Option 1')

        // })

        //  it('Click Derecho', () => {
        //     cy.contains('Context Menu').click()
        //     //cy.get('#hot-spot').rightclick()
        //     cy.get('#hot-spot').invoke('trigger','contextmenu') // Disparo la alerta directamente desde el trigger
        //     cy.on('window:alert', (alert) => {
        //         expect(alert).to.equal('You selected a context menu')
        //     })

        // })


        it('Espera que las promesas se resuelvan', () => {
            let waited = false


            function waitOneSecond(){
                //Devuelve una promesa que se da por resuelta al pasar un segundo

                return new Cypress.Promise((resolve, rejected) => {
                    setTimeout(() => {
                        //Ponemos el waited en true
                        waited = true
                        //resuelve con el string foo
                        resolve('foo')
                    }, 1000)
                })
            }

            cy.wrap(null).then(() => {
                //Devuelve una promesa en cy.then que es esperada (waited) hasta que resuelve

                return waitOneSecond().then((str) => {
                    expect(str).to.eq('foo')
                    expect(waited).to.be.true
                })
            })

        })
})

