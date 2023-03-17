import { StoreCombiner } from '~/store/store-combiner';

import type { Context } from '@nuxt/types';
import type { Inject } from '@nuxt/types/app';

export default ({ store }: Context, inject: Inject): void => {
  const combiner = new StoreCombiner(store);
  inject('vuex', combiner.modules);
};
