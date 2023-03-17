import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import type { IAuthState } from '~/core/api/controllers/auth.controller';

interface IState {
  _tokens: IAuthState,
}

const initialState = (): IState => ({
  _tokens: {
    accessToken: '',
    refreshToken: ''
  }
});

@Module({
  name: 'modules/auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  // state
  private _tokens: IAuthState = initialState()._tokens

  // getters
  public get isAuth(): boolean {
    return !!this._tokens.accessToken && !!this._tokens.refreshToken;
  }

  public get tokens(): IAuthState {
    return this._tokens;
  }

  // actions
  @Action
  public updateTokens(tokens: IAuthState): void {
    this.setTokensMutation(tokens);
  }

  @Action
  public resetTokens(): void {
    this.setTokensMutation(initialState()._tokens);
  }

  // mutations
  @Mutation
  private setTokensMutation(tokens: IAuthState): void {
    this._tokens = tokens;
  }
}
