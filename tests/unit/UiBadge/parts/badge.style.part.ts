import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type { TBadgeSize, TBadgeVariant } from '~/components/shared/UiBadge/index.vue';
import type {
  TMounterUtil,
  TOptionUtil,
  TStylerUtil,
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots
} from '../badge.unit.spec';

class BadgeStylePart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  public run(): void {
    describe('UiBadge style', () => {
      test('should display correct class with different variants and sizes', () => {
        const variants: Record<TBadgeVariant, string> = {
          default: '',
          warning: '',
          danger: '',
          success: '',
          info: ''
        };

        const sizes: Record<TBadgeSize, string> = {
          medium: '',
          small: ''
        };

        const variantKeys = Object.keys(variants);
        const sizeKeys = Object.keys(sizes);

        for (let i = 0; i < variantKeys.length; i += 1) {
          for (let j = 0; j < sizeKeys.length; j += 1) {
            const variant: TBadgeVariant = <TBadgeVariant>variantKeys[i];
            const size: TBadgeSize = <TBadgeSize>sizeKeys[j];

            const wrapper = this.mounter.mount({
              propsData: {
                variant,
                size
              }
            });

            expect(wrapper.classes()).toEqual(this.styler.getWrapperClass(variant, size));

            expect(wrapper.element).toMatchSnapshot();
          }
        }
      });
    });
  }
}

export default BadgeStylePart;
