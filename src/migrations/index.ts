import * as migration_20241216_222026_init from './20241216_222026_init';

export const migrations = [
  {
    up: migration_20241216_222026_init.up,
    down: migration_20241216_222026_init.down,
    name: '20241216_222026_init'
  },
];
