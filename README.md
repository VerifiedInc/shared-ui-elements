# shared-ui-elements

![npm version](https://img.shields.io/npm/v/%40verifiedinc-public%2Fshared-ui-elements?label=npm%20package&labelColor=%233c434b&color=%2332c553&cacheSeconds=60)
![Github Actions publish](https://github.com/VerifiedInc/shared-ui-elements/actions/workflows/publish.yml/badge.svg)

> Collection of reusable components.

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

## Adding dependencies

Ensure that new dependencies are added to both devDependencies and peerDependencies if required in the client's project.

## Installing in Your Client Session

When installing the `@verifiedinc/shared-ui-elements` package, you have access to different export paths optimized for specific use cases.

### Default ESM Export (Recommended)

The package’s default export path `'./'` uses ECMAScript modules (ESM), providing an optimized build for modern JavaScript environments. This approach is recommended for most applications:

```bash
npm install @verifiedinc/shared-ui-elements
```

```typescript
import { SomeComponent } from '@verifiedinc/shared-ui-elements';
```

This setup is efficient and works seamlessly with frameworks like Next.js, Vite, and other ESM-compatible environments.

### Using with Remix

Some frontend frameworks, such as Remix, have partial compatibility with ESM-only packages. To address this, the package also exposes the source files directly. This approach ensures that the Remix transpiler can properly bundle the package.

To utilize the source files in Remix, reference them directly in your import statements and adjust your `remix.config.js` as follows:

```typescript
import { SomeComponent } from '@verifiedinc/shared-ui-elements/src';
```

```js
// remix.config.js
export default {
  serverDependenciesToBundle: [/@verifiedinc\/shared-ui-elements/],
};
```

### Why Two Exports?

The default `'./'` export is optimized for environments that support ESM, providing better performance and tree-shaking. However, by also exposing the raw source files, we ensure compatibility with tools like Remix, where ESM-only packages might not work seamlessly without additional configuration.

Choose the export method that best suits your project setup.
