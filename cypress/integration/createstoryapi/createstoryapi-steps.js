import { Given, Then, When,And } from 'cypress-cucumber-preprocessor/steps';
/// <reference types="cypress" />

let userToken="";
Given('I am logging to swing application using API', () => {
    cy.postToken();
});

And('I am creating story using API', () => {
    cy.getLocalStorage("user_token").then(token => {
        cy.log("Identity token", token);
        cy.createStory(token);
        userToken=token;
});

Then('I validate created story from API', () => {
    cy.getLocalStorage("id").then(id => {
    cy.log("Result Id", id);
    cy.updateStory(userToken,id);
        });
    });  
});