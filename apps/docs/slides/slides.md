---
marp: true
footer: 'Sovereign Nature Initiative'
---

# Sovereign Nature Identifier

Unique identifier that can be connected to any piece of nature.

---

A bridge between identified nature and digital world.

---

## Nature Identification (Image Based)

1. Conservancy captures images of target object.
2. Images are passing through identification algorithms.
3. Local ID of target element of nature is created.
4. Local ID is mapped to unique Sovereign Nature Identifier.
5. Local ID metadata is passed to Sovereign Nature Identifier.

---

## Based on W3C DID Standard

---

## DID Structure

| DID Part                                       | Description                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **did**                                        | Standard did prefix.                                                                                   |
| **sni**                                        | DID method which tells resolver how to resolve identifier.                                             |
| **1284**                                       | Chain ID (Moonbeam).                                                                                   |
| **0x06012c8cf97bead5deae237070f9587f8e7a266d** | A smart contract address. This smart contract holds Sovereign Nature Identity DID Document (DDO) data. |

---

## DDO Structure

| Attribute             | Type                  | Description                                                      |
| --------------------- | --------------------- | ---------------------------------------------------------------- |
| **@context**          | Array of `string`     | Contexts used for validation.                                    |
| **version**           | `string`              | Document version information.                                    |
| **id**                | `string`              | DID address.                                                     |
| **chainId**           | `string`              | Chain ID of the network where DDO was stored.                    |
| **geometry**          | `string`              | WKT geometry representation of identified element.               |
| **identifierAddress** | `string`              | An address of identifier contract or account.                    |
| **metadata**          | `Metadata`            | Stores an object describing identified element.                  |
| **services**          | `Services`(#services) | Stores a list of services that can work with identified element. |

---

## DDO Metadata structure

| Attribute                 | Type                | Required | Description                                                                                                                |
| ------------------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| **name**                  | `string`            | yes      | Assigned name.                                                                                                             |
| **description**           | `string`            |          | Identified object description.                                                                                             |
| **createdAt**             | (ISO Date) `string` | yes      | Time when identity was created.                                                                                            |
| **updatedAt**             | (ISO Date) `string` |          | Time when identity was updated.                                                                                            |
| **picture**               | `string`            |          | Identified element picture stored on IPFS.                                                                                 |
| **taxonId**               | `string`            |          | taxon id that looks like `inat:1071898` which allow us to support multiple taxonomy systems.                               |
| **conservationStatus**    | `string`            |          | [Conservation status](https://en.wikipedia.org/wiki/Conservation_status) according to IUCN Red List of Threatened Species. |
| **status**                | `string`            |          | Status of identified element. Updated by the oracle contract                                                               |
| **oracleContractAddress** | `string`            |          | Address of oracle contract. Oracle contract updates status of the identified element.                                      |

---

## Example DDO Metadata Object

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

---

## DDO Services Structure

**Warning: This part of specification is still under heavy reconsideration.**

| Attribute       | Type     | Required | Description        |
| --------------- | -------- | -------- | ------------------ |
| id              | `string` | yes      | Unique service id. |
| type            | `string` | yes      | Service type.      |
| serviceEndpoint | `string` | yes      | Service endpoint.  |

---

## Example DDO Services Array

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

---

vadim@sovereignnature.com
