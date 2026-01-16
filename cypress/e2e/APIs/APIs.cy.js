describe('Pruebas de APIs con Cypress', () => {

it('El endpoint "posts" responde con status code 200', () => {

cy.request({
    
    url: 'https://jsonplaceholder.typicode.com/posts'
        
}).then((respuesta) =>{
    expect(respuesta.status).to.eq(200)
})
})
     

it('El endpoint "posts" tiene 100 entradas', () => {

cy.request({
    
    url: 'https://jsonplaceholder.typicode.com/posts'
        
}).then((respuesta) =>{
    expect(respuesta.body).to.have.length(100)
})
})


it('El titulo de "posts/1" tiene por titulo lo esperado', () => {

// cy.visit('https://jsonplaceholder.typicode.com') Si tu prueba es exclusivamente de API no necesitas cargar la página web en el navegador
// cy.request('/posts/1'). 
cy.request('https://jsonplaceholder.typicode.com/posts/1')
.its('body.title')
.should('eq','sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
})
     


//Esta opción es más limpia si en el futuro quieres validar más de un campo a la vez (por ejemplo, el ID y el título).
it('Valida el objeto completo del post', () => {

  cy.request('GET','https://jsonplaceholder.typicode.com/posts/1').then((response) => {
    // Validamos el status code primero
    expect(response.status).to.eq(200);
    
    // Validamos el título
    expect(response.body.title).to.eq('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
    
    // Validamos que el ID sea el correcto
    expect(response.body.id).to.eq(1);
  })
})



it('El POST request funciona correctamente para el endpoint ', () => {
  cy.request('POST','https://jsonplaceholder.typicode.com/posts',{
    "userId": 1,
     "id": 101,
    "title": "Perros Primos",
    "body": "Humor Nacional"
}).then((respuesta) => {
    expect(respuesta.body).to.have.property('title','Perros Primos')
})

})

it('Otro POST request funciona correctamente', () => {
  cy.request('POST','https://jsonplaceholder.typicode.com/posts',{
    "userId": 1,
     "id": 1010,
    "title": "Lagarto Juan",
    "body": "Terror"
}).then((respuesta) => {
    expect(respuesta.body.title).to.eq('Lagarto Juan')
})

})

it('El método PUT request funciona correctamente', () => {
  cy.request('PUT','https://jsonplaceholder.typicode.com/posts/1',{
    "title": "Estados Federados de Micronesia",
    "body": "Geografia"
}).then((response) => {
// Validamos el status code primero
    expect(response.status).to.eq(200);
    
    // Validamos el título
    expect(response.body.title).to.eq('Estados Federados de Micronesia');
    
    // Validamos que el ID sea el correcto
    expect(response.body.id).to.eq(1);

})

})


it('El DELETE request funciona correctamente', () => {
  cy.request('DELETE','https://jsonplaceholder.typicode.com/posts/1',)
})


it.only('Simula una solicitud GET a /posts con Stub', () => {
  const samplePosts = [
    {
      userId: 1,
      id: 1,
      title: 'Como será el barranco si el sapo lo cruza al trote',
      body: 'Papeles en el viento'
    },
    {
      userId: 2,
      id: 2,
      title: 'El ajedrecista que defiende con la cola',
      body: 'Sacheri'
    }
  ];

  // Interceptamos cualquier petición que termine en /posts
  cy.intercept('GET', '**/posts', {
    statusCode: 200,
    body: samplePosts
  }).as('getPosts');

  // Visitamos la página principal
  cy.visit('https://jsonplaceholder.typicode.com/');

  // En lugar de hacer click y navegar (que rompe el test), 
  // simulamos una llamada desde la consola de la página
  cy.window().then((win) => {
    win.fetch('/posts');
  });

  // Ahora sí, esperamos la intercepción
  cy.wait('@getPosts').then((interception) => {
    console.log('Intercepción exitosa:', interception);
    
    const { response } = interception;
    expect(response.body).to.have.lengthOf(2);
    expect(response.body[0].title).to.include('Como será el barranco');
  });
});

})
