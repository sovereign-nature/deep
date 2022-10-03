import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils-edge'

describe('Pages', async () => {
  await setup({ dev: true })

  it('Should render index page', async () => {
    expect(await $fetch('/')).toContain('Landing page')
  })

  it('Should render search page', async () => {
    expect(await $fetch('/search')).toContain('Search page')
  })

  it('Should render details page', async () => {
    const id = '123'
    expect(await $fetch(`/details/${id}`)).toContain('Detail page -')
  })
})
