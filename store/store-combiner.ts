import { getModule } from 'vuex-module-decorators';
import Main from '~/store/modules/main';

import type { Store } from 'vuex';
import type { IStoreModules } from './types';

export class StoreCombiner<S = any> { // TODO replace any with correct type
  private readonly _modules: IStoreModules;

  constructor(vuex: Store<S>) {
    this._modules = {
      main: getModule<Main>(Main, vuex)
    };
  }

  public get modules(): IStoreModules {
    return this._modules;
  }
}
