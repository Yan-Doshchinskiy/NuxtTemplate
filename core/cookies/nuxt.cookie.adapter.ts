import { NuxtCookies } from 'cookie-universal-nuxt';
import AbstractCookieAdapter from './abstract.cookie.adapter';

class NuxtCookieAdapter extends AbstractCookieAdapter {
  private readonly _cookies: NuxtCookies

  constructor(cookies: NuxtCookies) {
    super();
    this._cookies = cookies;
  }

  public get(key: string): string | null {
    return this._cookies.get(key);
  }

  public set(key: string, value: string): void {
    this._cookies.set(key, value);
  }

  public remove(key: string): void {
    this._cookies.remove(key);
  }
}
export default NuxtCookieAdapter;
