import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type {
  TMounterUtil,
  TOptionUtil,
  TStylerUtil,
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots
} from '../badge.unit.spec';

class BadgePropsPart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  public run(): void {
    describe('UiBadge props', () => {
      test('works correctly with default props', () => {
        const wrapper = this.mounter.mount();

        expect(wrapper.text()).toEqual(this.options.defaultComponentProps.label);
        expect(wrapper.classes()).toEqual(this.styler.getWrapperClass(this.options.defaultComponentProps.variant, this.options.defaultComponentProps.size));

        expect(wrapper.element).toMatchSnapshot();
      });

      test('should display prop "label" text', () => {
        const options = {
          propsData: {
            label: 'Badge Test Component'
          }
        };
        const wrapper = this.mounter.mount(options);

        expect(wrapper.text()).toEqual(options.propsData.label);
      });
    });
  }
}

export default BadgePropsPart;
