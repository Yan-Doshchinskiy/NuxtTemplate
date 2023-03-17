import MainMounterUtil from '~/tests/unit/prototypes/utils/main.mounter.util';
import type { Wrapper } from '@vue/test-utils';
import type Vue from 'vue';
import UiLoaderSmall from '~/components/shared/UiLoaderSmall/index.vue';
import type {
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots,
  TButtonWrapperOptions
} from '../button.unit.spec';

export interface IButtonMountElements {
  wrapper: Wrapper<Vue>,
  loaderWrapper: Wrapper<UiLoaderSmall>,
  entryWrapper: Wrapper<Vue, HTMLDivElement>,
  content: Wrapper<Vue, HTMLSpanElement>,
  iconLeft: Wrapper<Vue, HTMLDivElement>,
  iconRight: Wrapper<Vue, HTMLDivElement>,
}

class ButtonMounterUtil extends MainMounterUtil<IComponentDefaultProps, IComponentProps, IComponentSlots> {
  public mountWithParts(options?: TButtonWrapperOptions): IButtonMountElements {
    const mountOptions = options || this._defaultTestOptions;
    const wrapper = this.mount(mountOptions);
    const loaderWrapper = wrapper.findComponent<UiLoaderSmall>(UiLoaderSmall);
    const entryWrapper = wrapper.find<HTMLDivElement>(`.${this._wrapperClass}__wrapper`);
    const content = wrapper.find<HTMLSpanElement>(`.${this._wrapperClass}__content`);
    const iconLeft = wrapper.find<HTMLDivElement>(`.${this._wrapperClass}__icon_left`);
    const iconRight = wrapper.find<HTMLDivElement>(`.${this._wrapperClass}__icon_right`);
    return {
      wrapper,
      loaderWrapper,
      entryWrapper,
      content,
      iconLeft,
      iconRight
    };
  }
}

export default ButtonMounterUtil;
