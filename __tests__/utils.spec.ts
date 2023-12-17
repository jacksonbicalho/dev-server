import { describe, it, expect } from './helpers';
import { packageJson } from '@utils';

describe('packageJson', () => {
  it('should packageJson toBeDefined', () => {
    expect(packageJson).toBeDefined();
  });
});
