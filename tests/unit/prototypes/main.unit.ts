import MainPartsStructure from '~/tests/unit/prototypes/structures/main.parts.structure';
import MainCommonPart from '~/tests/unit/prototypes/parts/main.common.part';

import type MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';
import type MainOptionsUtil from '~/tests/unit/prototypes/utils/main.options.util';
import type MainStylerUtil from '~/tests/unit/prototypes/utils/main.styler.util';
import type MainMounterUtil from '~/tests/unit/prototypes/utils/main.mounter.util';
import type { IPartUnitUtils } from '~/tests/unit/prototypes/parts/main.abstract.part.';
import type { Slots } from '@vue/test-utils';

interface IMainUtils<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots, UO extends MainOptionsUtil<DP, P, S>, US extends MainStylerUtil, UM extends MainMounterUtil<DP, P, S>> {
  optionUtil: UO,
  stylerUtil: US,
  mounterUtil: UM,
  unitParts?: MainPartsStructure<DP, P, S, UO, US, UM>
}

abstract class MainUnit<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots, UO extends MainOptionsUtil<DP, P, S>, US extends MainStylerUtil, UM extends MainMounterUtil<DP, P, S>> {
  private readonly _options: UO;
  private readonly _styler: US;
  private readonly _mounter: UM;

  protected readonly _unitParts: MainPartsStructure<DP, P, S, UO, US, UM>;

  protected constructor(
    {
      optionUtil,
      stylerUtil,
      mounterUtil,
      unitParts
    }: IMainUtils<DP, P, S, UO, US, UM>
  ) {
    this._options = optionUtil;
    this._styler = stylerUtil;
    this._mounter = mounterUtil;

    if (unitParts) {
      this._unitParts = unitParts;
    } else {
      // define empty unitParts instance
      this._unitParts = new MainPartsStructure<DP, P, S, UO, US, UM>();
    }

    // add common part testing for all components
    this.addNewTestPart((utils) => new MainCommonPart(utils));
  }

  private get _utils(): IPartUnitUtils<UO, US, UM> {
    return {
      options: this._options,
      styler: this._styler,
      mounter: this._mounter
    };
  }

  public addNewTestPart<MP extends MainAbstractPart<DP, P, S, UO, US, UM>>(
    partCallback: (utils: IPartUnitUtils<UO, US, UM>
    ) => MP
  ): void {
    const partInstance = partCallback(this._utils);
    this._unitParts.addNewPart(partInstance);
  }

  public run(): void {
    this._unitParts.run();
  }
}

export default MainUnit;
