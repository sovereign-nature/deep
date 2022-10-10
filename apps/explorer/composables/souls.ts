import { Soul } from '~~/types/soul'

export const useSouls = (souls?: Soul[]) =>
  useState<Soul[]>('souls', () => souls)
