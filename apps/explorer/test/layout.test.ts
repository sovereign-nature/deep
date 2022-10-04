import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils-edge'

describe('Layout', async () => {
  await setup({ dev: true })

  it('Should not display header when search page', async () => {
    const result = await $fetch('/')

    expect(result).not.toContain('navbar-start')
  })

  it('Should display header when search page', async () => {
    const result = await $fetch('/search')

    expect(result).toContain('navbar-start')
  })

  it('Should display header when detail page', async () => {
    const result = await $fetch('/details/123')
    console.log(result)

    expect(result).toContain('navbar-start')
  })
})
