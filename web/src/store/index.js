import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading'
import createPersistPlugin from '@rematch/persist';

import * as models from './models';

const persistPlugin = createPersistPlugin({
  version: 2,
  whitelist: [
    'auth'
  ]
})

const loading = createLoadingPlugin();

const store = init({
  models,
  plugins: [
    loading,
    persistPlugin
  ]
});

export default store;