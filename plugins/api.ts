import type { Context } from '@nuxt/types';
import type { Inject } from '@nuxt/types/app';

import MainModule from '~/core/api/modules/main.module';
import NuxtCookieAdapter from '~/core/cookies/nuxt.cookie.adapter';

const BASE_URL = process.env.BASE_URL as string;

export default ({ $cookies }: Context, inject: Inject): void => {
  const mainModuleUrl = `${BASE_URL}/api/v1`;
  const cookies = new NuxtCookieAdapter($cookies);
  // create api module
  const mainApiModule = new MainModule(mainModuleUrl, { cookies });

  // inject module for binding interceptors in auth.ts plugin
  inject('apiModule', mainApiModule);

  // inject global modules for api requests
  inject('api', {
    ...mainApiModule.controllers
  });
};
