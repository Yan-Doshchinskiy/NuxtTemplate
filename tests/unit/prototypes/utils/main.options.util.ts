import merge from 'lodash.merge';

import type { Slots } from '@vue/test-utils';
import type { Component } from 'vue';

export interface IWrapperOptions<P, S> {
  propsData: P,
  slots?: S,
  attachTo?: Element | string,
  parentComponent?: Component
}

export type TWrapperOptionsMerge<P, S> = Partial<IWrapperOptions<Partial<P>, Partial<S>>>

export interface IMainOptionsUtilConstructor<DP extends Record<string, any>, P extends Partial<DP>, S> {
  defaultComponentProps: DP,
  defaultTestOptions: IWrapperOptions<P, S>,
}

class MainOptionsUtil<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots> {
  private readonly _defaultComponentProps: DP;
  private readonly _defaultTestOptions: IWrapperOptions<P, S>;

  constructor({ defaultComponentProps, defaultTestOptions }: IMainOptionsUtilConstructor<DP, P, S>) {
    this._defaultComponentProps = defaultComponentProps;
    this._defaultTestOptions = defaultTestOptions;
  }

  public get defaultComponentProps(): DP {
    return this._defaultComponentProps;
  }

  public get defaultTestOptions(): IWrapperOptions<P, S> {
    return this._defaultTestOptions;
  }

  public getWrapperOptions(options?: TWrapperOptionsMerge<P, S>): IWrapperOptions<P, S> {
    if (options) {
      // provide empty src object for options immutability
      return merge({}, this.defaultTestOptions, options);
    }
    return this.defaultTestOptions;
  }
}

export default MainOptionsUtil;
