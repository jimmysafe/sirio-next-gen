import * as migration_20241216_222026_init from './20241216_222026_init';
import * as migration_20241220_102955_contact from './20241220_102955_contact';
import * as migration_20241221_112133_brochure from './20241221_112133_brochure';
import * as migration_20241221_112453_note from './20241221_112453_note';

export const migrations = [
  {
    up: migration_20241216_222026_init.up,
    down: migration_20241216_222026_init.down,
    name: '20241216_222026_init',
  },
  {
    up: migration_20241220_102955_contact.up,
    down: migration_20241220_102955_contact.down,
    name: '20241220_102955_contact',
  },
  {
    up: migration_20241221_112133_brochure.up,
    down: migration_20241221_112133_brochure.down,
    name: '20241221_112133_brochure',
  },
  {
    up: migration_20241221_112453_note.up,
    down: migration_20241221_112453_note.down,
    name: '20241221_112453_note'
  },
];
