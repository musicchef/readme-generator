// used miniproject as starter code

const fs = require("fs");
const inquirer = require("inquirer");

// generate html
const generateHTML = (username, location, github, linkedin) => {
  return `## ${username}
  ### ${location}
  ### ${github}
  ### ${linkedin}`
};

// ask user for info
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your location?",
      name: "location",
    },
    {
      type: "input",
      message: "What is your Github handle?",
      name: "github",
    },
    {
      type: "input",
      message: "What is your LinkedIn Profile?",
      name: "linkedin",
    },
  ])
  .then((response) => {
    console.log(response);
    const htmlContent = generateHTML(
      response.username,
      response.location,
      response.github,
      response.linkedin
    );

    fs.writeFile("README.md", htmlContent, (err) =>
      err ? console.error(err) : console.log("success!")
    );
  });
