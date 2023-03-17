import { Store } from 'vuex';
import { IAppContextExtended } from '~/@types/index';

declare module 'vuex-module-decorators' {
  interface VuexModule {
    store: Store<any> & IAppContextExtended
  }
}
