import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type { IPartUnitUtils } from '~/tests/unit/prototypes/parts/main.abstract.part.';
import type { TWrapperOptionsMerge } from '~/tests/unit/prototypes/utils/main.options.util';
import type { IButtonMountElements } from '~/tests/unit/UiButton/utils/button.mounter.util';
import type {
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots,
  TMounterUtil,
  TOptionUtil,
  TStylerUtil,
  TButtonWrapperOptions
} from '../button.unit.spec';

type TButtonWrapperOptionsMerge = TWrapperOptionsMerge<IComponentProps, IComponentSlots>

class ButtonConditionsPart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  private _wrapperOptions: TButtonWrapperOptions;
  private _additionalTest: ((elements: IButtonMountElements) => void | Promise<void>) | undefined;

  constructor(utils: IPartUnitUtils<TOptionUtil, TStylerUtil, TMounterUtil>) {
    super(utils);
    this._wrapperOptions = this.options.defaultTestOptions;
  }

  public run(): void {
    describe('UiButton display conditions', () => {
      afterEach(async () => {
        const elements = this.mounter.mountWithParts(this._wrapperOptions);

        this._checkWrapperEntryElement(elements);
        this._checkLoaderElement(elements);

        if (this._additionalTest) {
          await this._additionalTest(elements);
        }

        expect(elements.wrapper.element).toMatchSnapshot();

        this._wrapperOptions = this.options.defaultTestOptions;
        this._additionalTest = undefined;
        elements.wrapper.destroy();
      });
      test('entry wrapper is visible with default props', () => {
        this._defineWrapperOptions();

        this._additionalTest = ({ entryWrapper }): void => {
          expect(entryWrapper.element).not.toBeUndefined();
          expect(entryWrapper.text()).toBe('');
        };
      });
      test('works correctly with label and without icons', () => {
        this._defineWrapperOptions(
          {
            propsData: {
              label: 'Custom label'
            }
          }
        );
      });
      test('works correctly with label and with left icon', () => {
        this._defineWrapperOptions(
          {
            propsData: {
              label: 'Custom label'
            },
            slots: {
              iconLeft: '<i class="icon-arrow"></i>'
            }
          }
        );
      });

      test('works correctly with label and with right icon', () => {
        this._defineWrapperOptions(
          {
            propsData: {
              label: 'Custom label'
            },
            slots: {
              iconRight: '<i class="icon-arrow"></i>'
            }
          }
        );
      });

      test('works correctly with label and with both icons', () => {
        this._defineWrapperOptions(
          {
            propsData: {
              label: 'Custom label'
            },
            slots: {
              iconLeft: '<i class="icon-arrow-left"></i>',
              iconRight: '<i class="icon-arrow-right"></i>'
            }
          }
        );
      });

      test('works correctly without label and with left icon', () => {
        this._defineWrapperOptions({
          slots: {
            iconLeft: '<i class="icon-arrow-left"></i>'
          }
        });
      });

      test('works correctly without label and with right icon', () => {
        this._defineWrapperOptions({
          slots: {
            iconRight: '<i class="icon-arrow-right"></i>'
          }
        });
      });

      test('works correctly without label and with both icons', () => {
        this._defineWrapperOptions({
          slots: {
            iconLeft: '<i class="icon-arrow-left"></i>',
            iconRight: '<i class="icon-arrow-right"></i>'
          }
        });
      });

      test('works correctly when isLoading equals to true', () => {
        this._defineWrapperOptions({
          propsData: {
            isLoading: true
          },
          slots: {
            iconLeft: '<i class="icon-arrow-left"></i>',
            iconRight: '<i class="icon-arrow-right"></i>'
          }
        });
      });
    });
  }

  private _defineWrapperOptions(options?: TButtonWrapperOptionsMerge): void {
    this._wrapperOptions = this.options.getWrapperOptions(options);
  }

  private _checkWrapperEntryElement(elements: IButtonMountElements): void {
    if (this._wrapperOptions.propsData.isLoading) {
      expect(elements.entryWrapper.element).toBeUndefined();
    } else {
      expect(elements.entryWrapper.element).not.toBeUndefined();
      this._checkLabelElement(elements);
      this._checkIconElements(elements);
    }
  }

  private _checkLoaderElement(elements: IButtonMountElements): void {
    if (this._wrapperOptions.propsData.isLoading) {
      expect(elements.loaderWrapper.vm).not.toBeUndefined();
    } else {
      expect(elements.loaderWrapper.vm).toBeUndefined();
    }
  }

  private _checkLabelElement({ entryWrapper, content }: IButtonMountElements): void {
    if (!this._wrapperOptions.propsData.label) {
      expect(content.element).toBeUndefined();
    } else {
      expect(content.text()).toBe(this._wrapperOptions.propsData.label);
      expect(entryWrapper.text()).toBe(this._wrapperOptions.propsData.label);
    }
  }

  private _checkIconElements({ iconLeft, iconRight, entryWrapper }: IButtonMountElements): void {
    const bigIconClass = `${this.styler.wrapperClass}__icon_big`;

    if (!this._wrapperOptions.slots?.iconLeft) {
      expect(iconLeft.element).toBeUndefined();
    } else {
      expect(iconLeft.html()).toContain(this._wrapperOptions.slots.iconLeft);
      expect(entryWrapper.html()).toContain(this._wrapperOptions.slots.iconLeft);
      if (!this._wrapperOptions.propsData.label) {
        expect(iconLeft.classes()).toContain(bigIconClass);
      } else {
        expect(iconLeft.classes()).not.toContain(bigIconClass);
      }
    }

    if (!this._wrapperOptions.slots?.iconRight) {
      expect(iconRight.element).toBeUndefined();
    } else {
      expect(iconRight.html()).toContain(this._wrapperOptions.slots.iconRight);
      expect(entryWrapper.html()).toContain(this._wrapperOptions.slots.iconRight);
      if (!this._wrapperOptions.propsData.label) {
        expect(iconRight.classes()).toContain(bigIconClass);
      } else {
        expect(iconRight.classes()).not.toContain(bigIconClass);
      }
    }
  }
}

export default ButtonConditionsPart;
