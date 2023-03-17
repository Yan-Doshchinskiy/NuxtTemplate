import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type { TButtonVariant } from '~/components/shared/UiButton/index.vue';
import type {
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots,
  TMounterUtil,
  TOptionUtil,
  TStylerUtil
} from '../button.unit.spec';

class ButtonStylePart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  private readonly _buttonVariants: Array<TButtonVariant> = ['primary', 'secondary', 'danger'];
  public run(): void {
    describe('UiButton style', () => {
      test('correct wrapper class with different variants (with loading)', () => {
        for (let i = 0; i < this._buttonVariants.length; i += 1) {
          const variant: TButtonVariant = this._buttonVariants[i];
          const options = this.options.getWrapperOptions({
            propsData: {
              isLoading: true,
              variant
            }
          });
          const { wrapper, loaderWrapper } = this.mounter.mountWithParts(options);
          expect(wrapper.classes()).toEqual(this.styler.getWrapperClass(variant, true));
          expect(wrapper.element).toMatchSnapshot();

          expect(loaderWrapper.props('variant')).toBe(variant);
        }
      });
      test('correct wrapper class with different variants (withoutLoading)', () => {
        for (let i = 0; i < this._buttonVariants.length; i += 1) {
          const variant: TButtonVariant = this._buttonVariants[i];

          const options = this.options.getWrapperOptions({
            propsData: {
              isLoading: false,
              variant
            }
          });
          const wrapper = this.mounter.mount(options);
          expect(wrapper.classes()).toEqual(this.styler.getWrapperClass(variant, false));
          expect(wrapper.element).toMatchSnapshot();
        }
      });
    });
  }
}

export default ButtonStylePart;
