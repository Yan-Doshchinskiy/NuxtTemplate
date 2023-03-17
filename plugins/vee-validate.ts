import Vue from 'vue';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  setInteractionMode
} from 'vee-validate';

import * as rules from 'vee-validate/dist/rules';
import type { Context } from '@nuxt/types';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
setInteractionMode('eager');

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...(rules as any)[rule]
  });
});

extend('condition', {
  // @ts-ignore
  validate: (_: string, [condition]: Array<string>) => ({
    valid: Boolean(condition) && condition !== 'false'
  })
});

export default ({ app }: { app: Context }): void => {
  configure({
    defaultMessage: (_field_, values) => app.i18n.t(`Errors.validation.${values._rule_}`, values) as string
  });
};
