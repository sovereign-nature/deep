# What is DEEP

DEEP is our Decentralised Ecological Economics Protocol that brings eco-data to digital creatives. We collaborate with biodiversity stewards, such as conservation organisations and rewilding projects, who generate eco-data as part of their daily work. Eco-data spans species-specific insights obtained through direct observations, evidence of species’ presence (e.g., droppings, tracks), and GPS-tracking devices, as well as broader habitat or ecosystem data collected via top-down remote sensing technologies such as satellites or ground collection of soil and plant samples. We process this data and make it accessible to digital creatives through our protocol; cleaning, standardising, and aggregating it. Digital creatives utilise this data in their projects, which can range from gaming and virtual environments to art and music production. The digital representations created using this data, so-called eco-linked assets, are then made available for purchase and the proceeds are shared between the conservation organisations (50-70%) and Sovereign Nature Initiative for funding its continued operations.

## Eco-Data

Eco-data is data produced through the work of ecological stewards in their daily activities to inform their conservation and/or restoration strategies and actions internally, and to report on their biodiversity impact.

As it is impossible to measure ecology in all its complexity, we work with the particular data our partners deem important for their work. There are numerous organisations involved in the process of collecting, storing, and processing information about ecology while doing their conservation and regeneration activities. Through collecting relevant and educational eco-data we work toward a mechanism of biodiversity impact reporting ‘from below’ ultimately avoiding the typical pitfalls of early standardisation.

## Eco-Linked Assets

Physical or digital goods can be connected to the eco-data through the DEEP link - a smart contract that stores the eco-data together with the digital asset, creating an eco-linked asset.

Creating such eco-linked assets is the key for generating substantial funding streams while imbuing the linked goods with tangible meaning.

## DEEP Link

DEEP Link is an ERC721 token that stores the connection between the linked asset and the ecological data set referencing an entity like an animal or a particular geographical area, enabling the creation of the eco-linked asset. It can link any ecological data set to a product - like nature-inspired in-game items, artworks, event tickets, etc. Such eco-linked assets can gain new properties, functions, and representations based on the data set they are connected to.

DEEP Link has the following parameters: 
id - unique DEEP Link ID which is a product of caching the address of the linked asset into a big integer number; 
entity_id - ID of the ecological entity according to the protocol; 
steward_id - ID of the biodiversity steward according to the protocol; 
funds_raised - amount of funds raised through the sale of the eco-linked asset.

## Derivative DID Address System

DEEP uses an address system based on the [Asset Decentralized Identifiers (DID) Method Specification](https://github.com/KILTprotocol/spec-asset-did). The linked asset address is encoded into the DEEP link token ID via the keccak256 function.

## Rarity Index

The Rarity Index is a custom metric designed to quantify and communicate the uniqueness and importance of various ecological features captured in the eco-data provided by conservation organisations. This index is key for integrating eco-data into gaming as it responds to the request of assigning rarity to items and functionalities by connecting it to real scientific data.  The rarity attributes can be updated from real-life events so that the index evolves together with the linked eco-data.

## Contributing to DEEP

Please refer to the [Development](development.md) guide.
