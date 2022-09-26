# Sovereign Nature Identifier Monorepo

This is a Sovereign Nature Identifier monorepo.

## What's inside?

This monorepo uses [turborepo](https://turborepo.org/) for tasks/caching and [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

Apps:

- `@sni/contracts`: Solidity contracts for Sovereign Nature Identifier built with [Hardhat](https://hardhat.org/) and [OpenZeppelin](https://www.openzeppelin.com/)
- `@sni/explorer`: Explorer for Sovereign Nature Identifier built with [Nuxt.js](https://v3.nuxtjs.org/) and [Tailwind](https://tailwindcss.com)
- `@sni/docs`: documentation generator based on [Vitepress](https://vitepress.vuejs.org/).

Packages:

- `eslint-config-*`: Shared `esLint` configurations.
- `prettier-config`: Shared `prettier` configuration.

### Installing Dependencies

To install dependencies for whole monorepo run `yarn install` from the root repo dirrectory.

### Build

To build all apps and packages, run the following command:

```shell
yan build
```

### Develop

To develop all apps and packages, run the following command:

```shell
yarn dev
```

To develop specific package run:

```shell
npx turbo run dev --filter <PACKAGE_NAME>
```

For example, to develop explorer, run:

```shell
npx turbo run dev --filter @sni/explorer
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```shell
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```shell
npx turbo link
```
