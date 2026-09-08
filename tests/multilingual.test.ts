import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from '../src/data/translations';
import { SUPPORTED_LANGUAGES } from '../src/i18n';

describe('multilingual content', () => {
  it('provides each supported locale', () => {
    for (const language of SUPPORTED_LANGUAGES) expect(TRANSLATIONS[language]).toBeDefined();
  });
  it('does not expose empty navigation labels', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      expect(Object.values(TRANSLATIONS[language].nav).every(Boolean)).toBe(true);
    }
  });
});
