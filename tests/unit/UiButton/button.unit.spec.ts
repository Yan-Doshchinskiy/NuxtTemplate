import UiButton from '~/components/shared/UiButton/index.vue';

import MainUnit from '~/tests/unit/prototypes/main.unit';

import MainOptionsUtil from '~/tests/unit/prototypes/utils/main.options.util';
import ButtonStylePart from '~/tests/unit/UiButton/parts/button.style.part';
import ButtonStylerUtil from '~/tests/unit/UiButton/utils/button.styler.util';
import ButtonEmitsPart from '~/tests/unit/UiButton/parts/button.emits.part';
import ButtonAttributesPart from '~/tests/unit/UiButton/parts/button.attributes.part';
import ButtonConditionsPart from '~/tests/unit/UiButton/parts/button.conditions.part';
import ButtonPropsPart from '~/tests/unit/UiButton/parts/button.props.part';

import type { IWrapperOptions } from '~/tests/unit/prototypes/utils/main.options.util';
import type { TButtonVariant } from '~/components/shared/UiButton/index.vue';
import type { Slots } from '@vue/test-utils';
import ButtonMounterUtil from '~/tests/unit/UiButton/utils/button.mounter.util';

export interface IComponentDefaultProps {
  isLoading: boolean,
  disabled: boolean,
  label: string,
  type: string,
  variant: TButtonVariant,
}

export interface IComponentProps extends Partial<IComponentDefaultProps> {
  dataSelector: string,
}

export interface IComponentSlots extends Slots{
  iconLeft: string,
  iconRight: string
}
export type TButtonWrapperOptions = IWrapperOptions<IComponentProps, IComponentSlots>
export type TOptionUtil = MainOptionsUtil<IComponentDefaultProps, IComponentProps, IComponentSlots>;
export type TStylerUtil = ButtonStylerUtil;
export type TMounterUtil = ButtonMounterUtil;

const defaultComponentProps: IComponentDefaultProps = {
  isLoading: false,
  disabled: false,
  label: '',
  type: 'button',
  variant: 'primary'
};

const defaultTestOptions: TButtonWrapperOptions = {
  propsData: {
    dataSelector: 'TEST'
  }
};

class ButtonUnitSpec extends MainUnit<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  constructor() {
    const optionUtil = new MainOptionsUtil({
      defaultComponentProps,
      defaultTestOptions
    });
    const stylerUtil = new ButtonStylerUtil({ wrapperClass: 'ui-button' });
    const mounterUtil = new ButtonMounterUtil({
      component: UiButton,
      wrapperClass: stylerUtil.wrapperClass,
      defaultTestOptions: optionUtil.defaultTestOptions
    });

    super({
      optionUtil,
      stylerUtil,
      mounterUtil
    });
  }
}

const testInstance = new ButtonUnitSpec();

testInstance.addNewTestPart((utils) => new ButtonPropsPart(utils));
testInstance.addNewTestPart((utils) => new ButtonStylePart(utils));
testInstance.addNewTestPart((utils) => new ButtonEmitsPart(utils));
testInstance.addNewTestPart((utils) => new ButtonAttributesPart(utils));
testInstance.addNewTestPart((utils) => new ButtonConditionsPart(utils));
testInstance.run();

export default ButtonUnitSpec;
