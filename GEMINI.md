# Project Overview

This project is a Docusaurus-based website called "Binh.run". It serves as a cookbook for "Ignite", a boilerplate for React Native applications. The website provides a collection of "recipes" which are common patterns and solutions for developing with Ignite. The main purpose of the site is to provide documentation and community-driven knowledge for Ignite users.

The project uses Node.js, React, and Docusaurus. It also uses Playwright for end-to-end testing.

# Building and Running

To work with this project, you'll need Node.js and yarn installed.

**Install dependencies:**
```bash
yarn install
```

**Run the development server:**
```bash
yarn start
```
This will start a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

**Build the website:**
```bash
yarn build
```
This command generates static content into the `build` directory and can be served using any static contents hosting service.

**Run end-to-end tests:**
```bash
yarn test:e2e
```
This will run the Playwright tests.

# Development Conventions

*   **Content:** The main content is located in the `docs` and `blog` directories. The "recipes" are in the `docs/recipes` directory.
*   **Structure:** The site structure and navigation are defined in `docusaurus.config.ts` and `sidebars.js`.
*   **Styling:** Custom styling is done in `src/css/custom.css`.
*   **Components:** Custom React components are located in the `src/components` directory.
*   **Contributions:** The `CONTRIBUTING.md` file provides guidelines for contributing to the project.
*   **Testing:** End-to-end tests are written using Playwright and are located in the `tests/e2e` directory.
