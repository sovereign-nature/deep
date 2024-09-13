import { describe, it, expect } from 'vitest';
import { testAssets } from './fixtures';
import {
  countByAttribute,
  countUnusedByAttribute,
  getAttributeIndex,
  getAttributeValue,
  updateOrAddAttribute,
} from './lib';

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

describe('Attributes helper functions', () => {
  it('should be able to get attribute value (element)', () => {
    const attributes = deepCopy(testAssets[0].attributes!);

    const element = getAttributeValue(attributes, 'element');

    expect(element).toBe('earth');
  });

  it('should be able to get attribute value (eventId)', () => {
    const attributes = deepCopy(testAssets[0].attributes!);

    const eventId = getAttributeValue(attributes, 'eventId');

    expect(eventId).toBe('edcon-2024');
  });

  it('should be able to count assets by attribute (element - water)', () => {
    const assets = deepCopy(testAssets);

    const earthAssets = countByAttribute(assets, 'element', 'water');

    expect(earthAssets).toBe(2);
  });

  it('should be able to count assets by attribute (element - earth)', () => {
    const assets = deepCopy(testAssets);

    const earthAssets = countByAttribute(assets, 'element', 'earth');

    expect(earthAssets).toBe(1);
  });

  it('should be able to find the index of an attribute (element)', () => {
    const attributes = deepCopy(testAssets[0].attributes);

    const index = getAttributeIndex(attributes!, 'element');

    expect(index).toBe(0);
  });

  it('should be able to find the index of an attribute (eventId)', () => {
    const attributes = deepCopy(testAssets[0].attributes!);

    const index = getAttributeIndex(attributes, 'eventId');

    expect(index).toBe(1);
  });

  it('should be able to update an attribute', () => {
    const attributes = deepCopy(testAssets[0].attributes!);

    const updatedAttributes = updateOrAddAttribute(
      attributes,
      'element',
      'water'
    );

    expect(getAttributeValue(updatedAttributes, 'element')).toBe('water');
  });

  it('should be able to add an attribute', () => {
    const attributes = deepCopy(testAssets[0].attributes!);

    const updatedAttributes = updateOrAddAttribute(
      attributes,
      'newAttribute',
      'newValue'
    );

    expect(getAttributeValue(updatedAttributes, 'newAttribute')).toBe(
      'newValue'
    );
  });

  it('should be able to count unused assets by attribute (element - water)', () => {
    const assets = deepCopy(testAssets);

    const count = countUnusedByAttribute(assets, 'element', 'water');

    expect(count).toBe(1);
  });
});
