
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
import "cypress-localstorage-commands";
/// <reference types="cypress" />

let token;
Cypress.Commands.add('postToken', () => {
  cy.api({
    method: 'POST',
    url: Cypress.config().apiLoginUrl, //get from cypress.env.json
    form: true, //sets to application/x-www-form-urlencoded
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',  
      'X-Requested-With': 'XMLHttpRequest',    
    },
    body: {
      username: 'timeschiefsub',
      password: 'NR360Generic',
      applicationId: 'Swing',
      connectionId: 'Editorial',
    }
  })
  .its('body')
  .then(response => {
    cy.setLocalStorage("user_token", response.token);
  });
});

Cypress.Commands.add('createStory', (token) => {
  const dayjs = require('dayjs')
  const uuid = () => Cypress._.random(0, 1e6)
  const id = uuid()
  const testname = `testautomationapi${id}`
  cy.api({
    method: 'POST',
    url: Cypress.config().createPostAPIUrl+token, //get from cypress.env.json
    headers: {
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest',    
    },
    body: {
      "name":testname+".xml","edition":"","issueDate":dayjs().format('YYYYMMDD'),"team":"The Times","type":"EOM::CompoundStory","application":"Swing","systemAttributes":{"props":{"productInfo":{"section":"","issueDate":dayjs().format('YYYYMMDD'),"edition":""},"workFolder":"/TIMES Desk/News","templateName":"/SysConfig/Common/Templates/General/Story.xml"}},"options":{"showSystemAttribute":true,"createMode":"AUTO_RENAME","useDefaultProduct":false,"issueDateDefaultStrategy":"NONE","timeSuffix":false,"checkinAction":true,"keepCheckedOut":true},"databaseId":33,"workFolder":"/TIMES Desk/News"}
  })
  .its('body')
  .then(response => {
    cy.setLocalStorage("id", response.result.id);
  });
});

Cypress.Commands.add('updateStory', (token,id) => {
  const readXML=cy.readFile('cypress/downloads/updatestory.xml').then(text1 => {
    console.log(text1);
  cy.api({
    method: 'POST',
    url: Cypress.config().updatePostAPIUrl+token+'&id='+id+''+'&newVersion=true',
    headers: {
      'Content-Type': 'text/xml',
      'X-Requested-With': 'XMLHttpRequest',   
    },
    body: text1,
    })
  .its('body')
  .then(response => {
    expect(response.result).to.equal("ok");
  });
});
});



