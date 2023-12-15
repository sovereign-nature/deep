# DID & DDO

Sovereign Nature Identifier is built on upcoming [W3C DID standard](https://www.w3.org/TR/did-core/). It connects widespread and commodified techniques of wildlife identification used by worldwide conservancies with distributed database such as Kusama blockchain.
Sovereign Nature Identifier is an NFT smart contract which follows custom fields and methods structure defined in the follow up standard.

## DID Structure

Every identified piece of nature is getting DID which looks like:
`did:sni:1284:0x06012c8cf97bead5deae237070f9587f8e7a266d:1`

| DID Part                                       | Description                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **did**                                        | Standard did prefix.                                                                                   |
| **sni**                                        | DID method which tells resolver how to resolve identifier.                                             |
| **1284**                                       | Chain ID (Moonbeam).                                                                                   |
| **0x06012c8cf97bead5deae237070f9587f8e7a266d** | A smart contract address. This smart contract holds Sovereign Nature Identity DID Document (DDO) data. |
| **1**                                          | NFT ID.                                                                                                |

## DDO Structure

| Attribute             | Type                  | Description                                                      |
| --------------------- | --------------------- | ---------------------------------------------------------------- |
| **@context**          | Array of `string`     | Contexts used for validation.                                    |
| **version**           | `string`              | Document version information.                                    |
| **id**                | `string`              | DID address.                                                     |
| **chainId**           | `string`              | Chain ID of the network where DDO was stored.                    |
| **identifierAddress** | `string`              | An address of identifier contract or account.                    |
| **metadata**          | [Metadata](#metadata) | Stores an object describing identified element.                  |
| **services**          | [Services](#services) | Stores a list of services that can work with identified element. |

### Metadata

| Attribute                 | Type                | Required | Description                                                                                                                |
| ------------------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| **name**                  | `string`            | yes      | Assigned name.                                                                                                             |
| **description**           | `string`            |          | Identified object description.                                                                                             |
| **image**                 | `string`            |          | Identified element picture stored on IPFS.                                                                                 |
| **geometry**              | `string`            | yes      | WKT geometry representation of identified element.                                                                         |
| **createdAt**             | (ISO Date) `string` | yes      | Time when identity was created.                                                                                            |
| **updatedAt**             | (ISO Date) `string` |          | Time when identity was updated.                                                                                            |
| **taxonId**               | `string`            |          | taxon id that looks like `inat:1071898` which allow us to support multiple taxonomy systems.                               |
| **conservationStatus**    | `string`            |          | [Conservation status](https://en.wikipedia.org/wiki/Conservation_status) according to IUCN Red List of Threatened Species. |
| **status**                | `string`            |          | Status of identified element. Updated by the oracle contract                                                               |
| **oracleContractAddress** | `string`            |          | Address of oracle contract. Oracle contract updates status of the identified element.                                      |

Example:

```json
{
  "metadata": {
    "name": "Sample element",
    "createdAt": "2020-11-15T12:27:48Z",
    "updatedAt": "2021-11-15T12:27:48Z",
    "description": "Sample description",
    "taxonId": "inat:1071898",
    "status": "exists"
  }
}
```

### Services

::: warning
This part of specification is still under heavy reconsideration.
:::

Services field contains array of services that can work with DID. Services can be used to attach Sovereign Nature Identity to datasets (Ocean Protocol) or to the NFT art projects (MyNFT, KodaDOT).

Each service has:

| Attribute       | Type     | Required | Description        |
| --------------- | -------- | -------- | ------------------ |
| id              | `string` | yes      | Unique service id. |
| type            | `string` | yes      | Service type.      |
| serviceEndpoint | `string` | yes      | Service endpoint.  |

Example:

```json
{
  "services": [
    {
      "id": "kodadot",
      "type": "marketplace",
      "serviceEndpoint": "https://kodadot.xyz/"
    }
  ]
}
```
