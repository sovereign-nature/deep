import { describe, it, expect } from 'vitest'
import { splitCamelCase } from '../utils'

describe('Split Camel Case', () => {
  it('Should split word in two', () => {
    expect(splitCamelCase('helloWorld')).toEqual('Hello World')
  })
})
