import type MainOptionsUtil from '~/tests/unit/prototypes/utils/main.options.util';
import type MainStylerUtil from '~/tests/unit/prototypes/utils/main.styler.util';
import type MainMounterUtil from '~/tests/unit/prototypes/utils/main.mounter.util';
import type { Slots } from '@vue/test-utils';

export interface IPartUnitUtils <UO, US, UM> {
  options: UO,
  styler: US,
  mounter: UM
}

abstract class MainAbstractPart<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots, UO extends MainOptionsUtil<DP, P, S>, US extends MainStylerUtil, UM extends MainMounterUtil<DP, P, S>> {
  protected _utils: IPartUnitUtils<UO, US, UM>

  constructor(utils: IPartUnitUtils<UO, US, UM>) {
    this._utils = utils;
  }

  protected get options(): UO {
    return this._utils.options;
  }

  protected get styler(): US {
    return this._utils.styler;
  }

  protected get mounter(): UM {
    return this._utils.mounter;
  }

  public abstract run(): void;
}

export default MainAbstractPart;
