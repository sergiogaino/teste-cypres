/// <reference types="cypress" />

describe('Testando paginas do Firebase', () => {
    before(() => {
        cy.visit('https://firebase.google.com')
        
        cy.server()
        cy.route({
            method: 'GET',
            url: 'https://firebase.google.com/_d/profile/user',
            response: [{usuario:'teste'}]    
        }).then(res => expect(res.response[0].usuario).to.be.equal('teste'))
    })

    it('Deve validar o titulo', () => {
        cy.title().should('be.equal', 'Firebase')
    })

    it('Deve navegar até a página Use Cases e verificar se encontra Use Cases na tela', () => {
        cy.get('.devsite-icon').contains('More').click({ force: true })
        cy.get('.gc-analytics-event').contains('Use Cases').click({ force: true })
        cy.get('h5').should('contain.text', 'Use Cases')
    })

    it('Deve mudar a lingua de English para Português – Brasil e verificar se encontra Casos de uso na tela', () => {
        cy.get('.devsite-top-logo-row > devsite-language-selector').click()
        cy.get('.devsite-select-item').contains('Português – Brasil').click()
        cy.get('#casos-de-uso').should('contain.text', 'Casos de uso')
    })
})