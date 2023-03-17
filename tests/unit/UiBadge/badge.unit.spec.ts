import UiBadge from '~/components/shared/UiBadge/index.vue';

import MainUnit from '~/tests/unit/prototypes/main.unit';
import MainMounterUtil from '~/tests/unit/prototypes/utils/main.mounter.util';
import MainOptionsUtil from '~/tests/unit/prototypes/utils/main.options.util';
import BadgeStylerUtil from '~/tests/unit/UiBadge/utils/badge.styler.util';
import BadgePropsPart from '~/tests/unit/UiBadge/parts/badge.props.part';
import BadgeStylePart from '~/tests/unit/UiBadge/parts/badge.style.part';

import type { IWrapperOptions } from '~/tests/unit/prototypes/utils/main.options.util';
import type { Slots } from '@vue/test-utils';
import type { TBadgeSize, TBadgeVariant } from '~/components/shared/UiBadge/index.vue';

export interface IComponentDefaultProps {
  label: string,
  variant: TBadgeVariant,
  size: TBadgeSize
}

export interface IComponentProps extends Partial<IComponentDefaultProps> {

}

export interface IComponentSlots extends Slots{

}

const defaultComponentProps: IComponentDefaultProps = {
  label: '',
  variant: 'default',
  size: 'medium'
};

const defaultTestOptions: IWrapperOptions<IComponentProps, IComponentSlots> = {
  propsData: {
  }
};

export type TOptionUtil = MainOptionsUtil<IComponentDefaultProps, IComponentProps, IComponentSlots>;
export type TStylerUtil = BadgeStylerUtil;
export type TMounterUtil = MainMounterUtil<IComponentDefaultProps, IComponentProps, IComponentSlots>;

class BadgeUnitSpec extends MainUnit<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  constructor() {
    const optionUtil = new MainOptionsUtil({
      defaultComponentProps,
      defaultTestOptions
    });
    const stylerUtil = new BadgeStylerUtil({ wrapperClass: 'ui-badge' });
    const mounterUtil = new MainMounterUtil({
      component: UiBadge,
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

const testInstance = new BadgeUnitSpec();

testInstance.addNewTestPart((utils) => new BadgePropsPart(utils));
testInstance.addNewTestPart((utils) => new BadgeStylePart(utils));

testInstance.run();

export default BadgeUnitSpec;
