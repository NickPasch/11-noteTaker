// Requiring needed packages
const inquirer = require('inquirer')
const fs = require ('fs')

// Prompting user for information that will constitute the readme using
// the inquirer package
inquirer.prompt([
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title",    
    },
    {
        type: "input",
        message: "Description of the project?",
        name: "description",
    },
    {
        type: "input",
        message: "How do you install this program?",
        name: "installation",
    },
    {
        type: "input",
        message: "How to use this program?",
        name: "usage",
    },
    {
        type: "list",
        message: "What license do you want?",
        name: "license",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3"],
    },
    {
        type: "input",
        message: "What are the guidelines for future contributors?",
        name: "contributing",
    },
    {
        type: "input",
        message: "Instructions for testing?",
        name: "tests",
    },
    {
        type: "input",
        message: "Questions",
        name: "questions",
    },
    {
        type: "input",
        message: "Github username?",
        name: "github",
    },
    {
        type: "input",
        message: "Email address?",
        name: "email",
    },
// Taking the answers directly from the prompt and using a foreach to iterate
// them into where they need to be given the data that it is 
]).then(answers => {
// Defining an array with the badges that corresponds to the list of licenses 
// I have chosen to use 
    var choices = [
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
        "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
        "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
        "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
        ]
// Initializing the data to find the correct badge 
    var dat = String(answers.license)
    var theBadge;
// The function that finds the correct badge
    function findBadge(){
        if(answers.license === "MIT"){
            theBadge = choices[0]
        }else if(answers.license === "APACHE 2.0"){
            theBadge = choices[1]
        }else if(answers.license === "GPL 3.0"){
            theBadge = choices[2]
        }else if(answers.license === "BSD 3"){
            theBadge = choices[3]
        }
    }
    findBadge();
// This variable holds the new readme and is formatted for the markdown document
    var data = `
# ${answers.title}  ${theBadge}

# Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
        
${answers.description}

## Installation 

${answers.installation}

## Usage

${answers.usage}

## License

This application is covered under the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

${answers.questions}

My Github: https://github.com/${answers.github}

If you have any questions, feel free to email me at: ${answers.email}
    `
// Writing the new markdown file with the fs package
fs.writeFile("README_SAMPLE.md", data, function(err){
    if(err){
        return err;
    };
    console.log('Success');
});
});

