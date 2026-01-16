describe('Sesiones y Login', () => {

    // it('Sin sesion guardada', () => {
    //     cy.visit('https://the-internet.herokuapp.com/')
    //     cy.contains('Form Authentication').click()
    //     cy.get('#username').type('tomsmith')
    //     cy.get('#password').type('SuperSecretPassword!')
    //     cy.get('#login').contains('Login').click()
    //     cy.url().should('include','/secure')
    //  })


    //  it('Con sesion guardada', () => {

    //     cy.session('Tom', () => {
    //     cy.visit('https://the-internet.herokuapp.com/')
    //     cy.contains('Form Authentication').click()
    //     cy.get('#username').type('tomsmith')
    //     cy.get('#password').type('SuperSecretPassword!')
    //     cy.get('#login').contains('Login').click()
    //     cy.url().should('include','/secure')
    //     cy.getCookies().should('have.length',5).then((cookies) => { //validando cookies
    //         expect(cookies[0]).to.have.property('name','optimizelyPendingLogEvents')
    //     })
    //     })
        
    //  })



    // it('Validando cookie', () => {

    //     cy.session('Tom', () => {
    //     cy.visit('https://the-internet.herokuapp.com/')
    //     cy.contains('Form Authentication').click()
    //     cy.get('#username').type('tomsmith')
    //     cy.get('#password').type('SuperSecretPassword!')
    //     cy.get('#login').contains('Login').click()
    //     cy.url().should('include','/secure')
    //     cy.getCookie('optimizelyPendingLogEvents').should('exist')
    //     cy.getCookie('optimizelyPendingLogEvents').should('not.have.property','value','%5B%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252Fsecure%26u%3Doeu1767899023641r0.8088168543520211%26wxhr%3Dtrue%26t%3D1767899025602%26f%3D298349752%2C318188263%22%2C%22n%3Dengagement%26g%3D298283957%26u%3Doeu1767899023641r0.8088168543520211%26wxhr%3Dtrue%26t%3D1767899024430%26f%3D298349752%2C318188263%22%2C%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252Flogin%26u%3Doeu1767899023641r0.8088168543520211%26wxhr%3Dtrue%26t%3D1767899024329%26f%3D298349752%2C318188263%22%2C%22n%3Dengagement%26g%3D298283957%26u%3Doeu1767899023641r0.8088168543520211%26wxhr%3Dtrue%26t%3D1767899024087%26f%3D298349752%2C318188263%22%2C%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252F%26u%3Doeu1767899023641r0.8088168543520211%26wxhr%3Dtrue%26t%3D1767899023646%26f%3D298349752%2C318188263%22%5D')
        
    //  })
    // })

//    it('Limpiar cookies', () => {

//         cy.session('Tom', () => {
//         cy.visit('https://the-internet.herokuapp.com/')
//         cy.contains('Form Authentication').click()
//         cy.get('#username').type('tomsmith')
//         cy.get('#password').type('SuperSecretPassword!')
//         cy.get('#login').contains('Login').click()
//         cy.url().should('include','/secure')
//         cy.getCookies().should('have.length',5).then((cookies) => { //validando cookies
//             expect(cookies[0]).to.have.property('name','optimizelyPendingLogEvents')
//         })
//         cy.clearCookies()
//         cy.getCookies().should('have.length',0)
//         //cy.clearCookie('optimizelyPendingLogEvents') borra una cookie en particular
//         })
        
//      })

it('Setear cookies', () => {

        cy.session('Tom', () => {
        cy.visit('https://the-internet.herokuapp.com/')
        cy.contains('Form Authentication').click()
        cy.get('#username').type('tomsmith')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('#login').contains('Login').click()
        cy.url().should('include','/secure')

        cy.getCookie('cookieLoca').should('not.exist')
        cy.setCookie('cookieLoca','Oreo')
        cy.getCookie('cookieLoca').should('have.property','value','Oreo')
        })
        
     })
     
     
})