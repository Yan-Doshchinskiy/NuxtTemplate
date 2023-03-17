import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type {
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots,
  TMounterUtil,
  TOptionUtil,
  TStylerUtil
} from '../button.unit.spec';

class ButtonAttributesPart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  public run(): void {
    describe('UiButton attributes', () => {
      test('check dataSelector attribute (default)', () => {
        const options = this.options.getWrapperOptions();
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('data-selector')).toEqual(`ACTION-${this.options.defaultTestOptions.propsData.dataSelector}`);
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check dataSelector attribute (custom)', () => {
        const dataSelector = 'CUSTOM-SELECTOR';
        const options = this.options.getWrapperOptions({
          propsData: {
            dataSelector
          }
        });
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('data-selector')).toEqual(`ACTION-${dataSelector}`);
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check disabled attribute (default)', () => {
        const options = this.options.getWrapperOptions();
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('disabled')).toBeUndefined();
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check disabled attribute (true)', () => {
        const options = this.options.getWrapperOptions({
          propsData: {
            disabled: true
          }
        });
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('disabled')).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check disabled attribute (false)', () => {
        const options = this.options.getWrapperOptions({
          propsData: {
            disabled: false
          }
        });
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('disabled')).toBeUndefined();
        expect(wrapper.element).toMatchSnapshot();
      });

      test('check type attribute (default)', () => {
        const options = this.options.getWrapperOptions();
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('type')).toBe(this.options.defaultComponentProps.type);
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check type attribute (button)', () => {
        const type = 'button';
        const options = this.options.getWrapperOptions({
          propsData: {
            type
          }
        });
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('type')).toBe(type);
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check type attribute (submit)', () => {
        const type = 'submit';
        const options = this.options.getWrapperOptions({
          propsData: {
            type
          }
        });
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('type')).toBe(type);
        expect(wrapper.element).toMatchSnapshot();
      });
      test('check type attribute (reset)', () => {
        const type = 'reset';
        const options = this.options.getWrapperOptions({
          propsData: {
            type
          }
        });
        const wrapper = this.mounter.mount(options);

        expect(wrapper.attributes('type')).toBe(type);
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  }
}

export default ButtonAttributesPart;
