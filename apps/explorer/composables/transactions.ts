// TODO: Change for transaction query when it exists
import { Transaction } from '~~/types/transaction'

export const useTransactions = () => {
  return useState(
    'transactions',
    () =>
      [
        {
          id: '000xd3399...',
          price: 'US$ 216',
          popularity: '62'
        },
        {
          id: '000xd50b1...',
          price: 'US$ 512',
          popularity: '255'
        },
        {
          id: '000xd6248...',
          price: 'US$ 666',
          popularity: '13'
        }
      ] as Transaction[]
  )
}
