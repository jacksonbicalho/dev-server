import { describe, it, expect } from './helpers';
import { server } from '../src/server';

describe('Server', () => {
  it('toBeDefined', () => {
    expect(server).toBeDefined();
  });
});
