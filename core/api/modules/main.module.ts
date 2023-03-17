import type AbstractCookieAdapter from '../../cookies/abstract.cookie.adapter';
import ApiModule from './api.module';
import AuthController from '../controllers/auth.controller';
import ProfileController from '../controllers/profile.controller';

import type { IApiModuleOptions } from '../types';

export interface IMainControllers {
  AuthController: AuthController,
  ProfileController: ProfileController,
}

interface IMainModuleOptions extends IApiModuleOptions {
  cookies: AbstractCookieAdapter
}

enum CONTROLLER_URL {
  MAIN_PROFILE = '/profile',
  MAIN_AUTH = '/auth',
}

class MainModule extends ApiModule<IMainControllers, IMainModuleOptions> {
  constructor(baseURL: string, options: IMainModuleOptions) {
    super(baseURL, options);

    this.controllers = {
      AuthController: new AuthController(this.apiClient, {
        controllerUrl: CONTROLLER_URL.MAIN_AUTH,
        cookies: this.options.cookies
      }),
      ProfileController: new ProfileController(this.apiClient, { // TODO example simple controller
        controllerUrl: CONTROLLER_URL.MAIN_PROFILE
      })
    };
  }
}

export default MainModule;
