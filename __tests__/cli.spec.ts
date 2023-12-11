import { mkcert, runCommand, setup } from '../src/cli';
import { describe, it, expect } from '@jest/globals';

describe('cli', () => {
  // it('should cli toBeDefined', () => {
  //   expect(cli).toBeDefined();
  // });

  describe('mkcert', () => {
    it('should version toBeDefined', () => {
      expect(mkcert).toBeDefined();
    });
  });

  describe('runCommand', () => {
    it('should runCommand toBeDefined', () => {
      expect(runCommand).toBeDefined();
    });
  });
  describe('setup', () => {
    it('should setup toBeDefined', () => {
      expect(setup).toBeDefined();
    });
  });
});
