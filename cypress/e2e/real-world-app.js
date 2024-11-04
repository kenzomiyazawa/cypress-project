/// <reference types="cypress" />

describe('main-page', () =>{

    beforeEach('Sign in', ()=>{

        function loginToPage(usrnm,pswrd){

        cy.visit('http://localhost:3000/')
        cy.contains('Sign in').should('be.visible')
        cy.get('#username').type(usrnm)
        cy.get('#password').type(pswrd)

        cy.get('button').should('contain','Sign In').click()

        cy.get('[data-test="sidenav-username"]').should('contain',"@"+usrnm)
        }
        
        //username and password
        loginToPage('johnwick','johnwick123')
    })
   
})testing the failure