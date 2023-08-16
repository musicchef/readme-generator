const fs = require("fs");
const inquirer = require("inquirer");

// license badges
const licenseInfo = {
    MIT: {
      badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
      notice: "This project is licensed under the MIT License. See the LICENSE file for details.",
    },
    "Apache-2.0": {
      badge: "[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
      notice: "This project is licensed under the Apache License 2.0. See the LICENSE file for details.",
    },
    "GPL-3.0": {
      badge: "[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
      notice: "This project is licensed under the GNU GPL v3. See the LICENSE file for details.",
    },
    "BSD-3-Clause": {
      badge: "[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
      notice: "This project is licensed under the BSD 3-Clause License. See the LICENSE file for details.",
    },
    Unlicense: {
      badge: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
      notice: "This project is licensed under the Unlicense. See the LICENSE file for details.",
    },
  };

// generate readme
const generateREADME = (title, description, installation, usage, license, contribution, tests, github, email, licenseBadge, licenseNotice) => {
  return `# ${title}

  ## Description
  
  ${licenseBadge} ${description}
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)
  
  ## Installation
  
  To install and use this application, follow these steps:
  
  ${installation}
  
  ## Usage
  
  To use the ${title}:
  
  ${usage}
  
  ## Contributing
  
  Contributions to this project are welcome! To contribute, follow these steps:
  
  ${contribution}

  ## Tests
  
  To run tests for this application, follow these steps:

  ${tests}
  
  ## License
  
  ${licenseNotice}
  
  ## Questions
  For questions or further assistance, feel free to contact me:
  
  GitHub: [${github}](https://github.com/${github})
  
  Email: [${email}](mailto:${email})`
};

// ask user for info
inquirer
  .prompt([
    {
      type: "input",
      message: "Enter project title...",
      name: "title",
    },
    {
      type: "input",
      message: "Enter a project description...",
      name: "description",
    },
    {
      type: "input",
      message: "Enter installation instructions for your application...",
      name: "installation",
    },
    {
      type: "input",
      message: "Enter usage information...",
      name: "usage",
    },
    {
        type: "list",
        message: "Choose a license for your application.",
        name: "license",
        choices: [
            {
                name: 'MIT License\nPermissive license. Allows commercial use, modification, distribution, and private use.',
                value: 'MIT',
              },
              {
                name: 'Apache License 2.0\nPermissive license. Allows commercial use, modification, and distribution.',
                value: 'Apache-2.0',
              },
              {
                name: 'GNU GPL v3\nCopyleft license. Requires derivative works to be under the same license.',
                value: 'GPL-3.0',
              },
              {
                name: 'BSD 3-Clause License\nPermissive license. Allows commercial use. Requires attribution.',
                value: 'BSD-3-Clause',
              },
              {
                name: 'Unlicense\nPublic domain dedication. Waives all copyright interests.',
                value: 'Unlicense',
              },
        ]
      },
      {
        type: "input",
        message: "Enter contribution guidelines...",
        name: "contribution",
      },
      {
        type: "input",
        message: "Enter test instructions...",
        name: "tests",
      },
      {
        type: "input",
        message: "Enter GitHub username...",
        name: "github",
      },
      {
        type: "input",
        message: "Enter email...",
        name: "email",
      },
  ])
  .then((response) => {
    console.log(response);
    const selectedLicense = licenseInfo[response.license];
    const licenseBadge = selectedLicense.badge;
    const licenseNotice = selectedLicense.notice;

    const readmeContent = generateREADME(
      response.title,
      response.description,
      response.installation,
      response.usage,
      response.license,
      response.contribution,
      response.tests,
      response.github,
      response.email,
      licenseBadge,
      licenseNotice
    );
// At last Generate the readme in the output folder
    fs.writeFile("./output/README.md", readmeContent, (err) =>
      err ? console.error(err) : console.log("success!")
    );
  });
