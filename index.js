const inquirer = require('inquirer');
const fs = require('fs');
const pageTemplate = require('./src/page-template.js');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js')

let team = [];

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
            let manager = new Manager (responses.managerName, responses.managerId, responses.email, responses.managerOffice)
            team.push(manager);
            continueBuild()
        })
};

function continueBuild() {
    inquirer
        .prompt(continueQ)
        .then((response) => {
            switch (response.continue) {
                case 'Add engineer':
                    addEngineer();
                    break;
                case 'Add intern':
                    addIntern();
                    break;
                case 'Finish building team':
                    writeHtml(team)
                    break;
            }
        })
}

function addEngineer() {
    inquirer
    .prompt(engineerQ)
    .then((response) => {
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
        team.push(engineer);
        console.log();
        continueBuild();
    })
}

function addIntern() {
    inquirer
    .prompt(internQ)
    .then((response) => {
        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        team.push(intern);
        continueBuild();
    })
}

function writeHtml(team) {
    fs.writeFile('what.html', pageTemplate(team), (err) =>                            // idk what 2nd param should be
    err ? console.error(err) : console.log('Successfully made file'));   
}

init();