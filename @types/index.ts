import type { IStoreModules } from '~/store/types';

export interface IAppContextExtended {
  $vuex: IStoreModules;
}
