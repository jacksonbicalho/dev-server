import * as ssldev from '../../src/bin/ssldev';

describe('bin/ssldev', () => {
  it('toBeDefined', () => {
    expect(ssldev).toBeDefined();
  });
});

// required with this small example
// to make the isolatedModules config happy
export {};
