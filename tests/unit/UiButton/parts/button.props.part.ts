import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type {
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots,
  TMounterUtil,
  TOptionUtil,
  TStylerUtil
} from '../button.unit.spec';

class ButtonPropsPart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  public run(): void {
    describe('UiButton props', () => {
      test('works correctly with default props', () => {
        const options = this.options.getWrapperOptions();
        const wrapper = this.mounter.mount(options);
        expect(wrapper.attributes('data-selector')).toBe(`ACTION-${this.options.defaultTestOptions.propsData.dataSelector}`);
        expect(wrapper.attributes('disabled')).toBeUndefined();
        expect(wrapper.attributes('type')).toBe(this.options.defaultComponentProps.type);
        expect(wrapper.classes()).toEqual(this.styler.getWrapperClass(this.options.defaultComponentProps.variant, this.options.defaultComponentProps.isLoading));
      });
    });
  }
}

export default ButtonPropsPart;
