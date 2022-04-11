import 'cypress-wait-until';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />


// ***********************************************
// This is login page elements
const usernameTxtBox="input[name='username']";
const passwordTxtBox="input[name='password']";
const loginBtn="button[id='loginButton']";
const homePageProfileIcon="div[id='emui-user-name'] span[data-usermodel='username']";
// ***********************************************


// ***********************************************
// This is dashboard page elements
const profileName="ChiefSub Times";
const logoutLnk="a[title='Logout']";
// ***********************************************


// -- This is a command to login to swing application --
Cypress.Commands.add("login", () => { 
   cy.visit('/');
   cy.fixture("userData").then((testData) => {
   cy.wait(2000);
   cy.get(usernameTxtBox,{timeout: 2000}).first().type(testData.username);
   cy.get(passwordTxtBox).first().type(testData.password);
  });
   cy.get(loginBtn).first().click();
   cy.get(homePageProfileIcon, {timeout: 25000}).contains(profileName);
 });


 // -- This is a command to logout from swing application --
Cypress.Commands.add("logout", () => { 
  cy.get(logoutLnk).click();
  cy.get(usernameTxtBox,{timeout: 5000}).should('be.visible');
});


