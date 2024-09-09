import { describe, it, expect } from 'vitest';
import { testAssets } from './fixtures';
import { countByAttribute, getAttributeValue } from './lib';

describe('Attributes helper functions', () => {
  it('should be able to get attribute value (element)', () => {
    const attributes = testAssets[0].attributes!;

    const element = getAttributeValue(attributes, 'element');

    expect(element).toBe('earth');
  });

  it('should be able to get attribute value (eventId)', () => {
    const attributes = testAssets[0].attributes!;

    const eventId = getAttributeValue(attributes, 'eventId');

    expect(eventId).toBe('edcon-2024');
  });

  it('should be able to count assets by attribute (element - water)', () => {
    const assets = testAssets;

    const earthAssets = countByAttribute(assets, 'element', 'water');

    expect(earthAssets).toBe(2);
  });

  it('should be able to count assets by attribute (element - earth)', () => {
    const assets = testAssets;

    const earthAssets = countByAttribute(assets, 'element', 'earth');

    expect(earthAssets).toBe(1);
  });
});
