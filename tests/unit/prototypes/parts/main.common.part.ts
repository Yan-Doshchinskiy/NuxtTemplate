import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type { Slots } from '@vue/test-utils';
import type MainOptionsUtil from '~/tests/unit/prototypes/utils/main.options.util';
import type MainStylerUtil from '~/tests/unit/prototypes/utils/main.styler.util';
import type MainMounterUtil from '~/tests/unit/prototypes/utils/main.mounter.util';

class MainCommonPart<DP extends Record<string, any>, P extends Partial<DP>, S extends Slots, UO extends MainOptionsUtil<DP, P, S>, US extends MainStylerUtil, UM extends MainMounterUtil<DP, P, S>> extends MainAbstractPart<DP, P, S, UO, US, UM> {
  public run():void {
    describe(`${this.mounter.component.name} common tests`, () => {
      test('component exist', () => {
        const wrapper = this.mounter.mount(this.options.defaultTestOptions);
        expect(wrapper.vm).toBeTruthy();
      });
    });
  }
}

export default MainCommonPart;
