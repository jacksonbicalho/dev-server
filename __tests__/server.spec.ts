// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import { server } from '../src/server';

describe('Server', () => {
  it('guaranteed random', () => {
    expect(server).toBeDefined();
  });
});

// required with this small example
// to make the isolatedModules config happy
export {};
