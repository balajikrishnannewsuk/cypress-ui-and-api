import { Given, Then, When,And } from 'cypress-cucumber-preprocessor/steps';
/// <reference types="cypress" />

Given('I am logging to swing application', () => {
    cy.login();
});

And('I am logging out from swing application', () => {
    cy.logout();
});