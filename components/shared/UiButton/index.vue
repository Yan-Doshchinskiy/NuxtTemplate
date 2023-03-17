<template>
  <button
    :data-selector="`ACTION-${dataSelector}`"
    :disabled="disabled"
    :type="type"
    class="ui-button"
    :class="buttonClass"
    @click="onClick"
    @submit="onSubmit"
    @reset="onReset"
  >
    <UiLoaderSmall v-if="isLoading" :variant="variant" />
    <div v-else class="ui-button__wrapper">
      <div
        v-if="$scopedSlots.iconLeft"
        :class="getIconClass('left')"
      >
        <slot name="iconLeft" />
      </div>

      <span v-if="label" class="ui-button__content">
        {{ label }}
      </span>
      <div
        v-if="$scopedSlots.iconRight"
        :class="getIconClass('right')"
      >
        <slot name="iconRight" />
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import UiLoaderSmall from '~/components/shared/UiLoaderSmall/index.vue';

import type { COMPUTED_STYLE } from '~/enums/ui';

export type TButtonVariant = 'primary' | 'secondary' | 'danger';
export type TIconPosition = 'left' | 'right'

@Component({
  name: 'UiButton',
  components: {
    UiLoaderSmall
  }
})
export default class UiButton extends Vue {
  @Prop({ required: true }) readonly dataSelector!: string;
  @Prop({ default: false }) readonly isLoading!: boolean;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: '' }) readonly label!: string;
  @Prop({ default: 'button' }) readonly type!: string;
  @Prop({ default: 'primary' }) readonly variant!: TButtonVariant;

  private get buttonClass(): COMPUTED_STYLE {
    const { variant } = this;
    return [
      {
        'ui-button_primary': variant === 'primary',
        'ui-button_secondary': variant === 'secondary',
        'ui-button_danger': variant === 'danger',
        'ui-button_loading': this.isLoading
      }
    ];
  }

  private getIconClass(position: TIconPosition): COMPUTED_STYLE {
    return [
      'ui-button__icon',
      {
        'ui-button__icon_big': !this.label,
        'ui-button__icon_left': position === 'left',
        'ui-button__icon_right': position === 'right'
      }
    ];
  }

  @Emit('click')
  private onClick(): void { }

  @Emit('submit')
  private onSubmit(): void { }

  @Emit('reset')
  private onReset(): void {}
}
</script>

<style lang="scss" scoped>
.ui-button {
  width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  transition: $transition;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  height: max-content;
  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    column-gap: 10px;
  }

  &__icon {
    display: flex;
    align-items: center;
    transition: $transition;

    ::v-deep i {
      font-size: 16px;
    }

    &_big {
      ::v-deep i {
        font-size: 20px;
      }
    }

    ::v-deep i::before {
      transition: $transition;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_primary {
    background-color: $blue;
    color: $white;

    ::v-deep i::before {
      transition: $transition;
      color: $white;
    }

    &:hover {
      background-color: $blue-hover;
    }

    &:active {
      background-color: $blue-hover;
      box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      background-color: $gray-500;
      cursor: default;
      box-shadow: none;
    }
  }

  &_secondary {
    color: $blue;
    background-color: transparent;
    border: 1px solid $blue;
    font-weight: 400;
    padding: 11px 15px;
    ::v-deep i::before {
      transition: $transition;
      color: $blue;
    }

    &:hover {
      border-color: $blue-hover;
      color: $blue-hover;

      ::v-deep i::before {
        color: $blue-hover;
      }
    }

    &:active {
      border-color: $blue-hover;
      color: $black;
      box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);

      ::v-deep i::before {
        color: $blue-hover;
      }
    }

    &:disabled {
      border-color: $gray-500;
      color: $gray-500;
      cursor: default;
      box-shadow: none;

      ::v-deep i::before {
        color: $gray-500;
      }
    }
  }

  &_danger {
    background-color: $red;
    color: $white;

    ::v-deep i::before {
      transition: $transition;
      color: $white;
    }

    &:hover {
      background-color: $red-hover;
    }

    &:active {
      background-color: $red-hover;
      box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      background-color: $gray-500;
      cursor: default;
      box-shadow: none;
    }
  }

  &_loading {
    pointer-events: none;
  }

  &_text {
    padding: 0;
    border: none;
    color: $blue;
  }
}
</style>
