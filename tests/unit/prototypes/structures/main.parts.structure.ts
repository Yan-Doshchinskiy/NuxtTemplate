import type { Slots } from '@vue/test-utils';
import type MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';
import type MainOptionsUtil from '~/tests/unit/prototypes/utils/main.options.util';
import type MainStylerUtil from '~/tests/unit/prototypes/utils/main.styler.util';
import type MainMounterUtil from '~/tests/unit/prototypes/utils/main.mounter.util';

class MainPartsStructure<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots, UO extends MainOptionsUtil<DP, P, S>, US extends MainStylerUtil, UM extends MainMounterUtil<DP, P, S>> {
  protected readonly _partsArray: Array<MainAbstractPart<DP, P, S, UO, US, UM>> = [];

  public addNewPart(instance: MainAbstractPart<DP, P, S, UO, US, UM>): void {
    this._partsArray.push(instance);
  }

  public run(): void {
    this._partsArray.forEach((partInstance) => {
      partInstance.run();
    });
  }
}

export default MainPartsStructure;
