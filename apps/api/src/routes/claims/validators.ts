import { Address } from '@unique-nft/utils';

export function addressIsValid(address: string): boolean {
  return (
    Address.is.substrateAddress(address) || Address.is.ethereumAddress(address)
  );
}
