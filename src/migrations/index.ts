import * as migration_20241129_134623_init from './20241129_134623_init';

export const migrations = [
  {
    up: migration_20241129_134623_init.up,
    down: migration_20241129_134623_init.down,
    name: '20241129_134623_init',
  },
];
