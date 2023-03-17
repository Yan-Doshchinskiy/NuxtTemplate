import { RESPONSE_STATUS } from '~/core/api/types';
import type { Context } from '@nuxt/types';
import type { AxiosRequestConfig } from 'axios';
import type { IResponseData } from '~/core/api/types';
import type { IBackendError } from '~/core/api/types/errors';

export default async function axios({
  $api, $apiModule, $vuex
}: Context): Promise<void> {
  const authController = $api.AuthController;

  // disconnect function declaration
  const disconnectUser = (): void => {
    try {
      authController.signOut();
      // TODO implement redirect logic
    } catch (e) {
      console.error('disconnect account error', e);
    }
  };

  // add api interceptors
  $apiModule.addResponseInterceptor<IResponseData>(
    (response) => response.data.result,
    async (error: any | IBackendError) => {
      if (error.response) {
        const originalRequest = error.config;
        if (error.response.status === RESPONSE_STATUS.UNAUTHORIZED && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await authController.requestTokensByRefresh();
            return $apiModule.sendRequest(originalRequest);
          } catch (e: any | IBackendError) {
            disconnectUser();
            throw e?.reponse?.data?.result || e;
          }
        }
      }
      throw error?.response?.data?.result || error;
    }
  );

  $apiModule.addRequestInterceptor((config: AxiosRequestConfig) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Authorization, ...headers } = config.headers;
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...(headers || {}),
      ...(authController.accessToken
        ? { Authorization: `Bearer ${authController.accessToken}` }
        : {})
    };
    return config;
  });

  // subscribe store to auth controller state
  $api.AuthController.subscribeState($vuex.auth.updateTokens);

  // fetch info for all users
  const fetchCommonInfo = async (): Promise<void> => {
    try {
      // TODO implement fetch common info logic
    } catch (e) {
      console.error('auth plugin fetchCommonInfo error', e);
    }
  };

  // fetch info for auth only users
  const fetchCommonInfoAuth = async (): Promise<void> => {
    try {
      // TODO implement fetch auth user info logic
    } catch (e) {
      console.error('auth plugin fetchCommonInfoAuth error', e);
    }
  };

  // fetch info for all users
  await fetchCommonInfo();

  // fetch info for authorized users
  if ($vuex.auth.isAuth) {
    await fetchCommonInfoAuth();
  }
}
