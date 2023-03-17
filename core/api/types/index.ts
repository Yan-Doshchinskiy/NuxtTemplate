import type { IMainControllers } from '../modules/main.module';

export type IAppApiControllers = IMainControllers

export interface IResponseData<R = any> {
  result: R
}

export enum RESPONSE_STATUS {
  UNAUTHORIZED = 401
}

export interface IApiModuleOptions {
}
export interface IApiModuleConfig {
  defaultResponseInterceptor?: boolean,
  defaultRequestInterceptor?: boolean,
}

export interface IApiControllerOptions {
  controllerUrl?: string,
}
