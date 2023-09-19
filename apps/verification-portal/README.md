# SNI Verification Portal

## Address Validation Flow

1. Each asset address follows Asset DID specification. To get the DEEP LINK token id, we need to hash the address using `@sni/address-utils/stringToId` method. This method converts the token address to unique id.
2. To validated that the token exists, we need to try getting the token ID from indexing API (TO BE ADDED).
3. To get the metadata associated with the token address, we need to parse Asset DID with the helper method - `@sni/address-utils/parseAddress`. After we know on which blockchain the token is stored, we can pull it's information. For example here is how you can pull information from Polkadot Asset Hub (TO BE ADDED).
4. To pull the information about the linked animal, you can use SNI API (TO BE ADDED).
