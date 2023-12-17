import { describe, it, expect } from './helpers';
import * as ssldev from '../src/bin/ssldev';

describe('bin/ssldev', () => {
  it('toBeDefined', () => {
    expect(ssldev).toBeDefined();
  });
});
