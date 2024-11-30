import * as migration_20241129_134623_init from './20241129_134623_init';
import * as migration_20241130_145116_subscription from './20241130_145116_subscription';

export const migrations = [
  {
    up: migration_20241129_134623_init.up,
    down: migration_20241129_134623_init.down,
    name: '20241129_134623_init',
  },
  {
    up: migration_20241130_145116_subscription.up,
    down: migration_20241130_145116_subscription.down,
    name: '20241130_145116_subscription'
  },
];
