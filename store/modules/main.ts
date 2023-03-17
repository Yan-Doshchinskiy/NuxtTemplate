import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

interface IState {

}

const initialState = (): IState => ({

});

@Module({
  name: 'modules/main',
  stateFactory: true,
  namespaced: true
})
export default class Main extends VuexModule {

}
