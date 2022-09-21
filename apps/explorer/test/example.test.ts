import { describe, it, expect } from 'vitest'
import { setup } from '@nuxt/test-utils-edge'

describe('My test', async () => {
  await setup({ dev: true })

  it('my test', () => {
    expect(1 + 1).toEqual(2)
  })
})
