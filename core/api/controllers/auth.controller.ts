import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

import type { IResponseData, IApiControllerOptions } from '../types';
import type {
  IAuthPayloads,
  IAuthTokensResponse,
  IEmailPayload,
  IEmailPayloadSignUp,
  ITelegramPayload,
  ITelegramPayloadSignUp,
  IWeb3Payload,
  IWeb3PayloadSignUp
  , IAuthPayloadsSignUp
} from '../types/auth';
import type { TSubscription } from '../../observers/types';
import type AbstractCookieAdapter from '../../cookies/abstract.cookie.adapter';

import ObjectObserver from '../../observers/object.observer';
import { AUTH_METHODS, COOKIE_TOKEN_TYPE } from '../types/auth';
import ApiController from './api.controller';

export interface IAuthState {
    [COOKIE_TOKEN_TYPE.ACCESS]: string | null,
    [COOKIE_TOKEN_TYPE.REFRESH]: string | null
}

type TRefreshResponse = AxiosResponse<IResponseData<IAuthTokensResponse>>

 interface IApiAuthControllerOptions extends IApiControllerOptions {
  cookies: AbstractCookieAdapter
}

const getAuthInitialState = (): IAuthState => ({
  [COOKIE_TOKEN_TYPE.ACCESS]: null,
  [COOKIE_TOKEN_TYPE.REFRESH]: null
});

class AuthController extends ApiController<IApiAuthControllerOptions> {
  private _refreshPromise: null | Promise<TRefreshResponse>
  private _refreshTokenTimeout: any
  private readonly _state: ObjectObserver<IAuthState>
  private readonly _refreshTokenPath: string
  private readonly _cookieManager: AbstractCookieAdapter

  constructor(apiClient: AxiosInstance, options: IApiAuthControllerOptions) {
    super(apiClient, options);
    this._refreshPromise = null;
    this._refreshTokenTimeout = null;
    this._refreshTokenPath = `${options.controllerUrl}/refresh`;
    this._cookieManager = this.options.cookies;
    this._state = new ObjectObserver<IAuthState>(getAuthInitialState());

    const accessToken = this._cookieManager.get(COOKIE_TOKEN_TYPE.ACCESS);
    const refreshToken = this._cookieManager.get(COOKIE_TOKEN_TYPE.REFRESH);
    this._state.updateKey(COOKIE_TOKEN_TYPE.ACCESS, accessToken);
    this._state.updateKey(COOKIE_TOKEN_TYPE.REFRESH, refreshToken);
  }

  public get accessToken(): IAuthState[COOKIE_TOKEN_TYPE.ACCESS] {
    return this._state.value[COOKIE_TOKEN_TYPE.ACCESS];
  }

  public get refreshToken(): IAuthState[COOKIE_TOKEN_TYPE.REFRESH] {
    return this._state.value[COOKIE_TOKEN_TYPE.REFRESH];
  }

  public async signUp<M extends AUTH_METHODS>(mode: M, payload: IAuthPayloadsSignUp[M]): Promise<void> {
    const handlers: Record<AUTH_METHODS, (payload: any) => Promise<void>> = {
      [AUTH_METHODS.EMAIL]: this._signUpEmail.bind(this),
      [AUTH_METHODS.TELEGRAM]: this._signUpTelegram.bind(this),
      [AUTH_METHODS.WEB3]: this._signUpWeb3.bind(this)
    };
    const handler = handlers[mode];
    await handler(payload);
  }

  public async signIn<M extends AUTH_METHODS>(mode: M, payload: IAuthPayloads[M]): Promise<IAuthTokensResponse> {
    const handlers: Record<AUTH_METHODS, (payload: any) => Promise<IAuthTokensResponse>> = {
      [AUTH_METHODS.EMAIL]: this._signInEmail.bind(this),
      [AUTH_METHODS.TELEGRAM]: this._signInTelegram.bind(this),
      [AUTH_METHODS.WEB3]: this._signInWeb3.bind(this)
    };
    const handler = handlers[mode];
    const tokens = await handler(payload);
    this._updateTokens(tokens);
    return tokens;
  }

  public subscribeState(cb: TSubscription<IAuthState>): void {
    this._state.subscribe(cb);
  }

  private _signUpEmail(payload: IEmailPayloadSignUp): Promise<void> {
    return this.post<any, IEmailPayloadSignUp>('/sign-up/email', payload);
  }

  private _signUpTelegram(payload: ITelegramPayloadSignUp): Promise<void> {
    return this.post<any, ITelegramPayloadSignUp>('/sign-up/telegram', payload);
  }

  private _signUpWeb3(payload: IWeb3PayloadSignUp): Promise<void> {
    return this.post<any, IWeb3PayloadSignUp>('/sign-up/web3', payload);
  }

  private _signInEmail(payload: IEmailPayload): Promise<IAuthTokensResponse> {
    return this.post<IAuthTokensResponse, IEmailPayload>('/email', payload);
  }

  private _signInTelegram(payload: ITelegramPayload): Promise<IAuthTokensResponse> {
    return this.post<IAuthTokensResponse, ITelegramPayload>('/telegram', payload);
  }

  private _signInWeb3(payload: IWeb3Payload): Promise<IAuthTokensResponse> {
    return this.post<IAuthTokensResponse, IWeb3Payload>('/web3', payload);
  }

  public signOut(): void {
    this._clearTokens();
  }

  public async requestTokensByRefresh(): Promise<IAuthTokensResponse> {
    try {
      if (this._refreshTokenTimeout) {
        return {
          accessToken: this.accessToken || '',
          refreshToken: this.refreshToken || ''
        };
      }
      if (!this._refreshPromise) {
        if (!this.refreshToken) {
          throw new Error('Refresh token does not exists');
        }
        const config = {
          headers: { Authorization: `Bearer ${this.refreshToken}` }
        };
        this._refreshPromise = axios.get<any, TRefreshResponse>(`${this.apiClient.defaults.baseURL}${this._refreshTokenPath}`, config);
      }
      const { data } = await this._refreshPromise;
      this._updateTokens(data.result);
      this._refreshPromise = null;
      return data.result;
    } catch (_error) {
      this.signOut();
      throw _error;
    }
  }

  private _updateTokens({ accessToken, refreshToken }: IAuthTokensResponse): void {
    if (!this._refreshTokenTimeout) {
      const SAFE_RESERVED_TIME = 10000; // time for waiting all request with 401 error (when we are sending many request in a moment)
      this._refreshTokenTimeout = setTimeout(() => {
        this._refreshTokenTimeout = null;
      }, SAFE_RESERVED_TIME);
    }
    this._state.updateKey(COOKIE_TOKEN_TYPE.ACCESS, accessToken);
    this._state.updateKey(COOKIE_TOKEN_TYPE.REFRESH, refreshToken);
    this._cookieManager.set(COOKIE_TOKEN_TYPE.ACCESS, accessToken);
    this._cookieManager.set(COOKIE_TOKEN_TYPE.REFRESH, refreshToken);
  }

  private _clearTokens(): void {
    this._state.reset();
    this._refreshPromise = null;
    this._refreshTokenTimeout = null;
    this._cookieManager.remove(COOKIE_TOKEN_TYPE.ACCESS);
    this._cookieManager.remove(COOKIE_TOKEN_TYPE.REFRESH);
  }
}

export default AuthController;
