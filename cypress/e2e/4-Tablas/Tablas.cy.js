describe('Tablas estáticas y dinámicas', () => {

    // beforeEach(()=> {
    //     cy.visit('https://www.freerangetesters.com')
    // })


    // it('Validamos texto en una tabla estática', () => {
    //     //Navegamos a la web con la tabla
    //     cy.visit('https://the-internet.herokuapp.com/tables')
    //     //Ubicamos la primer columna
    //     cy.get('#table1 > tbody > tr > td:nth-child(1)').each(($elm, index, $list) => {
    //         //Agarramos el texto de cada elemento de la columna 1
    //         const t = $elm.text();
    //         //Le ponemos el condicional de busqueda
    //         if (t.includes('Smith')){
    //             // De aca vamos al elemento que le sigue en el DOM
    //             cy.get('#table1 > tbody > tr > td:nth-child(1)').eq(index).next().then(function(p){
    //                 //Y tomamos el texto del elemento proximo
    //                 const r = p.text();
    //                 // Hacemos una validación de texto sobre este elemento
    //                 expect(r).to.contains('John');
    //             })
    //         }
    //     })
    // })    



    //  it('Validamos elemento en la tabla dinamica', () => {
    //     //Navegamos a la web con la tabla
    //     cy.visit('https://practice.expandtesting.com/dynamic-table')
    //     cy.contains('td', 'Firefox')
    //     .next()
    //     .should('contains.text','%')
        
    //  })

    it('Trabajando en forma resumida con tabla estatica', () => {
        //Navegamos a la web con la tabla
        cy.visit('https://the-internet.herokuapp.com/tables')
        cy.contains('td', 'Smith')
        .next()
        .should('have.text','John')
        
     })
})
