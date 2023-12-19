# Decentralized Ecological Economics Protocol (DEEP)

DEEP is a protocol that brings eco-data to digital creatives. We collaborate with ecological stewards, such as conservation organisations and rewilding projects, who already generate data as part of their daily work. Eco-data spans species-specific insights obtained through direct observations, evidence of species’ presence (e.g., droppings, tracks) and GPS-tracking devices, as well as broader habitat or ecosystem data collected via top-down remote sensing technologies such as satellites or ground collection of soil and plant samples. We process this data and make it accessible to digital creatives through our protocol, moving it through cleaning, standardisation and aggregation data pipelines. Digital creatives utilise this data in their projects, which can range from gaming and virtual environments to music production. The digital representations created using this data are then made available for purchase, with a share of the proceeds (50-70%) going to the conservation organisations directly, and a share to Sovereign Nature Initiative to fund its continued operation.

# What Is Eco-Data

Eco-Data - is data produced through the work of ecological stewards in their daily activities. It can include ...

It is impossible to measure ecology in all its complexity. However, there are thousands of organisations involved in the process of collecting, storing, and processing information about ecology while doing their conservation and regeneration activities. We collect data from such activities and make it available inside of the DEEP.

The Eco-Data requirements are that it needs to be relevant, educational, and rich in empathy, it needs to be collected by the Ecological Steward and shall refer to the Ecological Entity the Project Supported is intended to conserve and/or restore. The Eco-Data is utilized both internally to inform their conservation and/or restoration strategies and actions, and externally to report on their nature-positive impact.

# Eco-Linked Assets

Physical or digital goods can be linked to the Eco-Data through the DEEP Link - a smart contract that stores the link between the Eco-Data and the linked asset.

Linking such assets allows us to generate additional value for both an asset and the ecological entity it's linked to.

# DEEP Link

DEEP Link is an [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) token that stores the connection between the linked asset and ecological entity. It can link any ecological entity with its derivatives - like nature-inspired in-game items or artworks. Such nature-connected items can get new properties, functions, and representations based on the ecology they are connected to.

DEEP Link has the following parameters:
`id` - unique DEEP Link ID which is a product of caching the address of the linked asset into a big integer number.
`entity_id` - ID of the ecological entity according to the protocol.
`steward_id` - ID of the conservation organisation according to the protocol.
`funds_raised` - amount of funds raised by the link for the steward and ecological entity.

### Asset DID Address System

DEEP uses an address system based on the Asset DID [specification](https://github.com/KILTprotocol/spec-asset-did). The linked asset address is encoded into the DEEP Link token ID via the keccak256 function.

## Rarity Index

Organisation according to a rarity is a key logic in the gaming world as well as in the NFT art and gaming spaces. The Rarity Index is a custom metric designed to quantify and communicate the uniqueness and importance of various ecological features captured in the Eco-Data provided by conservation organisations. This index is key for integrating eco-data into gaming as it responds to the request of assigning rarity to items and functionalities by connecting it to real scientific data.  The rarity attributes can be updated from real-life events so that the index evolves together with the linked eco-data.

## Roadmap

...

## Contributing to DEEP

Please refer to the [Development](development.md) guide.
