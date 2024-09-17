# shared-ui-elements

> Set of shared components.

## About

This project was created to share the UI, agnostic logics and theme throughout the core apps.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

   ```
   cd path/to/shared-ui-elements
   npm install
   ```

3. Start Storybook

   ```
   npm run storybook # Runs storybook
   ```

## Path import alias

This project utilizes alias only for the storybook implementation, the modules to be exposed in the package are not aliased since the package will be consumed by the core apps and they may not have the same alias configuration nor the same folder structure.
