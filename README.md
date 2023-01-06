# Fuse - Admin template and Starter project for Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

##Webpack build conversion reference
https://developer.okta.com/blog/2019/12/09/angular-webpack

## Document generation

Run the following command to generate documentation

npm run doc

After successful generation goto http://localhost:18080

### e2e Testing config in progress

cmd: npx cypress open

## Contribution guidelines

1. Fork the main repo -> https://github.com/brmaStr/brm-ngTemplate.git  
   You should be added as a team member to the triage team  
   reference: https://docs.github.com/en/get-started/quickstart/fork-a-repo
2. Clone the forked repo from your github account (this is very important, otherwise you will be cloning the main repo where you will not have contributer access)  
   reference: https://www.educative.io/answers/how-to-clone-a-git-repository-using-the-command-line
3. Create a branch (\*\*\* Very important)  
   command git branch fix-branch
4. checkout the created branch  
   command: git checkout fix-branch
5. Make changes
6. Create required unit tests
7. commit the changes  
   command: git add .  
    git commit -m "commit msg"
8. Publish your branch
9. Make sure the CI Pipe line jobs are successful (See Actions tab in your forked repository)
10. Create pull request for the previous commit  
     Reference: https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request
11. After your pull request is merged, you can safely delete this branch
