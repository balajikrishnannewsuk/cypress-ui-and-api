
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
import './index';
import './windowcommands';
import 'cypress-iframe';
/// <reference types="cypress" />


// ***********************************************
// This is login page elements
const usernameTxtBox="input[name='username']";
const passwordTxtBox="input[name='password']";
const loginBtn="button[id='loginButton']";
// ***********************************************


// ***********************************************
// This is dashboard page elements
const homePageProfileIcon="div[id='emui-user-name'] span[data-usermodel='username']";
 const profileName="ChiefSub Times";
// const profileName="Design Times";
const logoutLnk="a[title='Logout']";
// ***********************************************

// ***********************************************
// This elements used to create new story
const addIcon="i[class='fas fa-plus-square smaller']";
const newStoryOption="span[data-i18n='[html]header.menu.newstory']";
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testname = `testautomation${id}`
const nameTxtBox="input[id='name']";
const channelDropDown="div[id='channel']";
const channelOption="li[role='option']";
const topicFromChkBox="#createTopicFrom";
const createButton="button[type='submit']";
const headlineArea="div[eom-name='headline']";
// ***********************************************

// -- This is a command to login to swing application --
Cypress.Commands.add("login", () => { 
   cy.visit(Cypress.config('baseUrl'));
   cy.window().then(win => {
    cy.stub(win, 'open').callsFake((url, target) => {
      expect(target).to.be.undefined
      // call the original `win.open` method
      // but pass the `_self` argument
      return win.open.wrappedMethod.call(win, url, '_self')
    }).as('open')
  })
   cy.fixture("userData").then((testData) => {
   cy.wait(2000);
   cy.get(usernameTxtBox).first().type(testData.username);
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

// -- This is a command to create new story --
Cypress.Commands.add("createNewStory", () => { 
  cy.get(addIcon).click();
  cy.get(newStoryOption).click();
  cy.get(nameTxtBox).type(testname);
  cy.get(channelDropDown).click();
  cy.get(channelOption).contains('None').click();
  cy.get(topicFromChkBox).click();
  cy.get(createButton).click();
  cy.wait(20000);
  cy.debug();
  cy.get("div[eom-name='headline']",{timeout: 50000}).should('be.visible');
  // cy.url().then(url => {
  // const getUrl = url;
  // cy.log('Current URL is : '+getUrl)
  // const currentURL = getUrl.split('?')
  // const newURL = currentURL[0]
  // cy.forceVisit(newURL);
  // })
  // cy.visit(newURL);
  // cy.get("div[eom-name='headline']",{timeout: 50000}).should('be.visible');
})
  // cy.go('back');
  // cy.window().then((win) => {
  //   cy.stub(win, 'open').as('windowOpen').callsFake(url => {
  //     newUrl = url;
  //   });
  // })
  // cy.window().its('open').should('be.called');
  // cy.wait(60000);
  // cy.get("div[eom-name='headline']",{timeout: 50000}).should('be.visible');
  // cy.switchToTab(0);
  // // cy.switchToTab("'"+testname+"'.xml - Méthode Swing - Editorial");
  // cy.wait(60000);
  // cy.get("div[eom-name='headline']",{timeout: 50000}).should('be.visible');
  
  // cy.get('a[title^='+testname+']').invoke('attr', 'data-obj-id').then(myLink => {
  //   cy.window().then((win) => {
  //     cy.stub(win, 'open', url => {
  //       win.location.href = Cypress.config('baseUrl')+'#editor/'+myLink;
  //     }).as("popup")
  //   })
  //   cy.url()
  //   .should('include', '#editor/')
  //   // cy.visit(Cypress.config('baseUrl')+'#editor/'+myLink);
  //   // cy.reload();
  //   // cy.url().should('include',myLink);
  //     // moving back to the parent tab with the help of go() method
  //     // cy.go('back');
  //   cy.wait(60000);
  // cy.get('a[title^='+testname+']').then(function ($a) {
  //   // extract the fully qualified href property
  //   const href = $a.prop('data-obj-id')
  //   // and now visit the href directly
  //   cy.visit('/'+'#editor/'+href)
  //   cy.url().should('include', 'users.html')
  // })
//   cy.get('.emui-content-text-area > a').contains(testname).then(($div) => {
//     const dataId = Cypress.$($div).attr("data-obj-id");
//     console.log(dataId);
// });
// cy.wait(40000);
  // cy.switchToTab(1);
  // cy.get("div[eom-name='headline']",{timeout: 50000}).should('be.visible');
  // cy.log(+testname+".xml - Méthode Swing - Editorial");


  Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self');
    });
});


