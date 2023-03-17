import type { IStoreModules } from '~/store/types';
import type { IAppApiControllers } from '~/core/api/types';
import type MainModule from '~/core/api/modules/main.module';

export interface IAppContextExtended {
  $vuex: IStoreModules;
  $api: IAppApiControllers,
  $apiModule: MainModule,
}
