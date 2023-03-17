<template>
  <span
    class="ui-badge"
    :class="badgeClass"
  >
    {{ label }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { COMPUTED_STYLE } from '~/enums/ui';

export type TBadgeSize = 'medium' | 'small';
export type TBadgeVariant = 'default' | 'warning' | 'danger' | 'success' | 'info';

@Component({
  name: 'UiBadge'
})
export default class UiBadge extends Vue {
  @Prop({ default: '' }) readonly label!: string;
  @Prop({ default: 'default' }) readonly variant!: TBadgeVariant;
  @Prop({ default: 'medium' }) readonly size!: TBadgeSize;

  private get badgeClass(): COMPUTED_STYLE {
    const {
      variant,
      size
    } = this;
    return [
      {
        'ui-badge_default': variant === 'default',
        'ui-badge_warning': variant === 'warning',
        'ui-badge_danger': variant === 'danger',
        'ui-badge_success': variant === 'success',
        'ui-badge_info': variant === 'info',
        'ui-badge_medium': size === 'medium',
        'ui-badge_small': size === 'small'
      }
    ];
  }
}
</script>

<style lang="scss" scoped>

.ui-badge {
  height: max-content;
  width: max-content;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;

  cursor: default;

  // color modifiers
  &_default {
    background-color: $gray-200;
    color: $black;
  }

  &_warning {
    background-color: transparentize($brown, $transparentize);
    color: $brown;
  }

  &_danger {
    background-color: transparentize($red, $transparentize);
    color: $red;
  }

  &_success {
    background-color: transparentize($teal, $transparentize);
    color: $teal;
  }

   //special color and size modifier
  &_info {
    background-color: $brown-light;
    color: $black;
    padding: 0 4px;
    min-height: 20px;
  }

  // size modifiers
  &_medium {
    padding: 4px 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    min-height: 28px;
  }

  &_small {
    padding: 2px 4px;
    font-weight: 700;
    font-size: 10px;
    line-height: 10px;
    min-height: 14px;
  }

}
</style>
