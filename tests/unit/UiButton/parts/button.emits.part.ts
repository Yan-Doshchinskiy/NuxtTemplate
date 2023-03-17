import MainAbstractPart from '~/tests/unit/prototypes/parts/main.abstract.part.';

import type {
  IComponentDefaultProps,
  IComponentProps,
  IComponentSlots,
  TMounterUtil,
  TOptionUtil,
  TStylerUtil
} from '../button.unit.spec';

class ButtonEmitsPart extends MainAbstractPart<IComponentDefaultProps, IComponentProps, IComponentSlots, TOptionUtil, TStylerUtil, TMounterUtil> {
  public run(): void {
    describe('UiButton emits', () => {
      test('check emit trigger (disabled default)', () => {
        const options = this.options.getWrapperOptions();

        const wrapper = this.mounter.mount(options);
        const events = ['click', 'submit', 'reset'];
        const falsyEvents = ['keydown', 'focus', 'random-event'];
        events.forEach((event) => {
          wrapper.trigger(event);
          expect(wrapper.emitted()[event]).toBeTruthy();
        });
        falsyEvents.forEach((event) => {
          wrapper.trigger(event);
          expect(wrapper.emitted()[event]).toBeFalsy();
        });
      });
      test('check emit trigger (disabled false)', () => {
        const options = this.options.getWrapperOptions({
          propsData: {
            disabled: false
          }
        });

        const wrapper = this.mounter.mount(options);
        const events = ['click', 'submit', 'reset'];
        const falsyEvents = ['keydown', 'focus', 'random-event'];
        events.forEach((event) => {
          wrapper.trigger(event);
          expect(wrapper.emitted()[event]).toBeTruthy();
        });
        falsyEvents.forEach((event) => {
          wrapper.trigger(event);
          expect(wrapper.emitted()[event]).toBeFalsy();
        });
      });
      test('check emit trigger (disabled true)', () => {
        const options = this.options.getWrapperOptions({
          propsData: {
            disabled: true
          }
        });
        const wrapper = this.mounter.mount(options);
        const events = ['click', 'submit', 'reset'];
        const falsyEvents = ['keydown', 'focus', 'random-event'];
        events.forEach((event) => {
          wrapper.trigger(event);
          expect(wrapper.emitted()[event]).toBeFalsy();
        });
        falsyEvents.forEach((event) => {
          wrapper.trigger(event);
          expect(wrapper.emitted()[event]).toBeFalsy();
        });
      });
    });
  }
}

export default ButtonEmitsPart;
