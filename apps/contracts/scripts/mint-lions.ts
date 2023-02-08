import { SNI_CONTRACT_ADDRESS, SNI_OWNER_ADDRESS } from '@sni/constants';
import { INITIAL_STATUS } from '@sni/constants/mocks/identifier';
import fs from 'fs';
import { ethers } from 'hardhat';
import { SovereignNatureIdentifier } from '../typechain-types';
import { makeIpfsUrl, pinData } from './utils';

const IPFS_URL =
  'ipfs://bafybeihpckelcd4bgrcteg7egtckmixns4p2mhysfmlh6lpdxwghqmhmvi';

const MUSKETEERS_PDF =
  'https://www.marapredatorconservation.org/wp-content/uploads/2020/09/Muskuteers-Marsh.pdf';

const MUSKETEERS_PROVENANCE =
  'https://docs.google.com/document/d/1a9SJnL3uQlZP8R9yKv-qN4BYYfDQZakagx-O3sNw3Tg';

type LionData = {
  id: string;
  gender: string;
  name: string;
  birthday: string;
  coalition: string;
  prides: string;
  unique_features: string;
  whisker_right_0: string;
  whisker_right_1: string;
  whisker_left_1: string;
  whisker_left_0: string;
  ear_right: string;
  whisker_right_2: string;
  ear_left: string;
  face: string;
  whisker_left_2: string;
  mouth: string;
  age: string;
  body_size: string;
  nose_color: string;
  mane: string;
  mane_color: string;
  left_ear: string;
  right_ear: string;
  teeth: string;
  skin_color: string;
  tail: string;
  unusual_whiskers: string;
  eyes: string;
  left_whisker_spots: number;
  right_whisker_spots: number;
  left_side_scars: string;
  right_side_scars: string;
  grouping: string;
  group_name: string;
  prides_controlled: number;
};

function getImage(path: string) {
  const cleanedPath = path.replace('images', '');

  return IPFS_URL.concat(cleanedPath);
}

function processLionData(data: LionData) {
  const image = getImage(`${data.face}`);

  const attributes = [];
  for (const [key, value] of Object.entries(data)) {
    let resValue;
    if (
      key in
      [
        'whisker_right_0',
        'whisker_right_1',
        'whisker_right_2',
        'whisker_left_0',
        'whisker_left_1',
        'whisker_left_2',
        'ear_right',
        'ear_left',
        'face',
      ]
    ) {
      resValue = getImage(value as string);
    } else {
      resValue = value;
    }

    attributes.push({ trait_type: key, value: resValue });
  }

  return {
    image,
    name: data.name,
    attributes,
  };
}

async function mintLionData(
  data: LionData,
  contract: SovereignNatureIdentifier
) {
  const parsedMetadata = processLionData(data);
  const additionalMetadata = {
    description: '...',
    properties: {
      statusDescription: '{ "0": "Alive", "1": "Dead" }',
      taxonId: 'itis:183803',
      conservationStatus: 'VU',
      geometry: 'POINT(5.9559 47.8084)',
    },
  };

  const metadata = { ...parsedMetadata, ...additionalMetadata };
  const metadataHash = ethers.utils.id(JSON.stringify(metadata));

  const tokenURI = makeIpfsUrl((await pinData(metadata)).data.value.cid);

  console.log('Successfully uploaded metadata to NFT Storage at ', tokenURI);

  await contract.safeMint(
    SNI_OWNER_ADDRESS,
    tokenURI,
    metadataHash,
    MUSKETEERS_PDF,
    MUSKETEERS_PROVENANCE,
    INITIAL_STATUS
  );
}

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );

  const sni = SovereignNatureIdentifier.attach(SNI_CONTRACT_ADDRESS);

  const data = fs.readFileSync('./data/lions_data.json');
  const lionsData: Array<LionData> = JSON.parse(data.toString());

  lionsData.forEach((ld) => mintLionData(ld, sni));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
