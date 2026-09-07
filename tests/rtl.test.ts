import { describe, expect, it } from 'vitest';
import { documentLanguage } from '../src/i18n';

describe('document direction', () => {
  it('sets Arabic to RTL', () => expect(documentLanguage('ar')).toEqual({ lang: 'ar', dir: 'rtl' }));
  it('keeps French and English LTR', () => {
    expect(documentLanguage('fr').dir).toBe('ltr');
    expect(documentLanguage('en').dir).toBe('ltr');
  });
});
