# Development

## Services Status

![](https://api.checklyhq.com/v1/badges/checks/ede36d5e-dde9-4c73-8c6c-77c185a0a5fa?style=flat&theme=default)
![](https://api.checklyhq.com/v1/badges/checks/e10df834-ee26-4487-b33c-1f043aeb5b66?style=flat&theme=default&responseTime=true)
![](https://api.checklyhq.com/v1/badges/checks/6e0413c0-cbf6-4510-bb04-57e3248f2cdc?style=flat&theme=default&responseTime=true)
![](https://api.checklyhq.com/v1/badges/checks/717a7099-bb01-42ae-ada0-d92936c2770f?style=flat&theme=default&responseTime=true)
![](https://api.checklyhq.com/v1/badges/checks/1c935243-e4b7-45e1-a54c-0c0b9474ed7b?style=flat&theme=default&responseTime=true)
![](https://api.checklyhq.com/v1/badges/checks/af187fc8-5280-4f81-9b13-dba3d43f091d?style=flat&theme=default&responseTime=true)

## Repository structure

This monorepo uses [turborepo](https://turborepo.org/) for tasks/caching and [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

Apps:

- `@sni/assets-gateway`: API for retrieving assets metadata from various blockchains.
- `@sni/contracts`: solidity contracts for DEEP Protocol built with [Hardhat](https://hardhat.org/) and [OpenZeppelin](https://www.openzeppelin.com/).
- `@sni/gateway`: GraphQL gateway built with [GraphQL Mesh](https://the-guild.dev/graphql/mesh) (DEPRECATED).
- `@sni/indexer`: indexer for [The Graph](https://thegraph.com/) (DEPRECATED).
- `@sni/verification-portal`: REAL website for interacting with DEEP Protocol.
- `@sni/web3-highlights`: utility API for retrieving highlights lists.

Packages:

- `@sni/constants`: Shared constants.
- `@sni/configs`: Shared configs.
- `@sni/json-schemas`: Shared JSON schemas.
- `@sni/solidity-interfaces`: Shared Solidity interfaces, like IDerivative.

## Installing Dependencies

To install dependencies for whole monorepo run `pnpm i` from the root repo directory.

## Build

To build all apps and packages, run the following command:

```shell
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```shell
pnpm -r --parallel run dev
```

To develop specific package run:

```shell
pnpm dev --filter <PACKAGE_NAME>
```

For example, to develop verification portal, run:

```shell
pnpm dev --filter @sni/verification-portal
```

## Remote Caching

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
