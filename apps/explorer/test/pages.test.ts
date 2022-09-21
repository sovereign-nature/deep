import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils-edge'

describe('Index Page', async () => {
  await setup({ dev: true })

  it('Should render index page', async () => {
    expect(await $fetch('/')).toMatch('Nature Explorer')
  })
})
