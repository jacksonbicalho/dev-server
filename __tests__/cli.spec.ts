import { describe, it, expect } from './helpers';
import { mkcert, runCommand, setup } from '../src/cli';

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
