import type { Language } from './types';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['fr', 'ar', 'en'];

export function documentLanguage(language: Language) {
  return { lang: language, dir: language === 'ar' ? 'rtl' : 'ltr' } as const;
}
