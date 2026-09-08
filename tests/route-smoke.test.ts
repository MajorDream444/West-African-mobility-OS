import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';

describe('single-page route smoke test', () => {
  it('has a Vite entrypoint and root mount', async () => {
    const [html, main] = await Promise.all([readFile('index.html', 'utf8'), readFile('src/main.tsx', 'utf8')]);
    expect(html).toContain('id="root"');
    expect(html).toContain('/src/main.tsx');
    expect(main).toContain('createRoot');
  });
});
