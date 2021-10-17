const inquirer = require('inquirer');
const fs = require('fs');
const pageTemplate = require('./src/page-template.js');


const managerQuestions = [
    {
        type: 'input',
        message: "Enter the team manager's name:",
        name: 'managerName'
    },
    {
        type: 'input',
        message: "Enter the team manager's ID:",
        name: 'managerId'
    },
    {
        type: 'input',
        message: "Enter the team manager's email:",
        name: 'email',
        validate: function validate(email) {

            const emailArr = email.split('');
            if (emailArr.indexOf('@') !== -1) {
                return true
            } else {
                return 'Invalid email. Try again' 
            }
        }
    },
    {
        type: 'input',
        message: "Enter the team manager's office number:",
        name: 'managerOffice'
    }
];

const continueQ = [{
        type: 'list',
        message: "Continue building team?",
        name: 'continue',
        choices: ['Add engineer','Add intern','Finish building team']
    
}];

const engineerQ = [
    {
        type: 'input',
        message: "Enter the engineer's name:",
        name: 'engineerName'
    },
    {
        type: 'input',
        message: "Enter the engineer's ID:",
        name: 'engineerId'
    },
    {
        type: 'input',
        message: "Enter the engineer's email:",
        name: 'engineerEmail'
    },
    {
        type: 'input',
        message: "Enter the engineer's github:",
        name: 'engineerGithub'
    }
];

const internQ = [
    {
        type: 'input',
        message: "Enter the intern's name:",
        name: 'internName'
    },
    {
        type: 'input',
        message: "Enter the intern's ID:",
        name: 'internId'
    },
    {
        type: 'input',
        message: "Enter the intern's email:",
        name: 'internEmail'
    },
    {
        type: 'input',
        message: "Enter the intern's school:",
        name: 'internSchool'
    }
];

function init() {
    inquirer
        .prompt(managerQuestions)
        .then((responses) => {
            console.log(responses);
            
            continueBuild()
        })
};

function continueBuild() {
    inquirer
        .prompt(continueQ)
        .then((response) => {
            console.log(response);
            switch (response.continue) {
                case 'Add engineer':
                    addEngineer();
                    break;
                case 'Add intern':
                    addIntern();
                    break;
                case 'Finsh building team':
                    console.log('done build');
                    // fxn to write html file
                    break;
            }
        })
}

function addEngineer() {
    inquirer
    .prompt(engineerQ)
    .then((response) => {
        console.log(response);
        continueBuild();
    })
}

function addIntern() {
    inquirer
    .prompt(internQ)
    .then((response) => {
        console.log(response);
        continueBuild();
    })
}

// function writeHtml() {
//     fs.appendFile('what.html', pageTemplate, (err) =>                            // idk what 2nd param should be
//     err ? console.error(err) : console.log('Successfully made file'));   
// }

// // given roles
// manager
// employee
//     engineer
//     intern

// // given fxns
// getName
// getRole
// getId
// getEmail
// getOfficeNumber
// getGithub
// getSchool



init();