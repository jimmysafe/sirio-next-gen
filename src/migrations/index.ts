import * as migration_20241216_222026_init from './20241216_222026_init';
import * as migration_20241220_102955_contact from './20241220_102955_contact';

export const migrations = [
  {
    up: migration_20241216_222026_init.up,
    down: migration_20241216_222026_init.down,
    name: '20241216_222026_init',
  },
  {
    up: migration_20241220_102955_contact.up,
    down: migration_20241220_102955_contact.down,
    name: '20241220_102955_contact'
  },
];
