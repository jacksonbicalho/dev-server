import { mkcert } from '../../src/cli';
import { describe, it, expect } from '@jest/globals';

describe('cli/mkcert', () => {
  it('toBeDefined', () => {
    expect(mkcert).toBeDefined();
  });
});
