import { mount, shallowMount, VueClass } from '@vue/test-utils';

import type { Slots, Wrapper } from '@vue/test-utils';
import type { IWrapperOptions } from '~/tests/unit/prototypes/utils/main.options.util';

export interface IMounterConstructor<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots> {
  defaultTestOptions: IWrapperOptions<P, S>,
  component: VueClass<Vue>,
  wrapperClass: string,
}

class MainMounterUtil<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots> {
  protected readonly _defaultTestOptions: IWrapperOptions<P, S>
  protected readonly _component: VueClass<Vue>
  protected readonly _wrapperClass: string

  constructor({ defaultTestOptions, component, wrapperClass }: IMounterConstructor<DP, P, S>) {
    this._defaultTestOptions = defaultTestOptions;
    this._component = component;
    this._wrapperClass = wrapperClass;
  }

  public get component(): VueClass<Vue> {
    return this._component;
  }

  public mount(options?: IWrapperOptions<P, S>): Wrapper<Vue> {
    const mountOptions = options || this._defaultTestOptions;
    return mount(this._component, mountOptions);
  }

  public shallowMount(options: IWrapperOptions<P, S>): Wrapper<Vue> {
    const mountOptions = options || this._defaultTestOptions;
    return shallowMount(this._component, mountOptions);
  }
}

export default MainMounterUtil;
