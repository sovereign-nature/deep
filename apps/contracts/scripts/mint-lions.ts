import { SNI_CONTRACT_ADDRESS } from '@sni/constants';
import axios from 'axios';
import fs from 'fs';
import { ethers } from 'hardhat';
import { SovereignNatureIdentifier } from '../typechain-types';

const STORAGE_API_URL = 'https://api.nft.storage/';
const IPFS_URL =
  'ipfs://bafybeihpckelcd4bgrcteg7egtckmixns4p2mhysfmlh6lpdxwghqmhmvi';

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
};

function getImage(path: string) {
  const cleanedPath = path.replace('images', '');

  return IPFS_URL.concat(cleanedPath);
}

function processLionData(data: LionData) {
  const {
    gender,
    birthday,
    coalition,
    prides,
    unique_features,
    whisker_right_0,
    whisker_right_1,
    whisker_right_2,
    whisker_left_0,
    whisker_left_1,
    whisker_left_2,
    ear_left,
    ear_right,
    face,
    id,
    name,
  } = data;

  const image = getImage(`${face}`);

  const attributes = [
    { trait_type: 'id', value: id },
    { trait_type: 'gender', value: gender },
    { trait_type: 'birthday', value: birthday },
    { trait_type: 'coalition', value: coalition },
    {
      trait_type: 'prides',
      value: prides,
    },
    { trait_type: 'uniqueFeatures', value: unique_features },
    {
      trait_type: 'whiskersRightImage0',
      value: whisker_right_0 ? getImage(`${whisker_right_0}`) : '',
    },
    {
      trait_type: 'whiskersRightImage1',
      value: whisker_right_1 ? getImage(`${whisker_right_1}`) : '',
    },
    {
      trait_type: 'whiskersRightImage2',
      value: whisker_right_2 ? getImage(`${whisker_right_2}`) : '',
    },
    {
      trait_type: 'whiskersLeftImage0',
      value: whisker_left_0 ? getImage(`${whisker_left_0}`) : '',
    },
    {
      trait_type: 'whiskersLeftImage1',
      value: whisker_left_1 ? getImage(`${whisker_left_1}`) : '',
    },
    {
      trait_type: 'whiskersLeftImage2',
      value: whisker_left_2 ? getImage(`${whisker_left_2}`) : '',
    },
    {
      trait_type: 'earRight',
      value: ear_right ? getImage(`${ear_right}`) : '',
    },
    {
      trait_type: 'earLeft',
      value: ear_left ? getImage(`${ear_left}`) : '',
    },
    { trait_type: 'face', value: image },
  ];

  return {
    image,
    name,
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

  //axios bearer token

  const res = await axios.post(`${STORAGE_API_URL}/upload`, metadata);

  if (res.status === 200) {
    console.log('Successfully uploaded metadata to NFT Storage');

    const cid = res.data.value.cid;

    console.log('CID: ', cid);
  }

  // await contract.safeMint(
  //   SNI_OWNER_ADDRESS,
  //   pinnedMetadata.url,
  //   'some-data',
  //   'some-compute',
  //   0
  // );
}

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );

  const sni = SovereignNatureIdentifier.attach(SNI_CONTRACT_ADDRESS);

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${process.env.NFT_STORAGE_API_KEY}`;

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
