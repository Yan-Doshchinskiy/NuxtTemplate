<template>
  <div
    class="ui-loader"
  >
    <div
      class="ui-loader__ring"
      :class="loaderClass"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

import { COMPUTED_STYLE } from '~/enums/ui';

import type { TButtonVariant } from '~/components/shared/UiButton/index.vue';

@Component({
  name: 'UiLoaderSmall'
})

export default class UiLoaderSmall extends Vue {
  @Prop({ default: 'primary' }) readonly variant!: TButtonVariant

  private get loaderClass(): COMPUTED_STYLE {
    const { variant } = this;
    return [
      {
        'ui-loader__ring_secondary': variant === 'secondary'
      }
    ];
  }
}
</script>

<style lang="scss" scoped>
.ui-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20px;
  &__ring {
    &:after {
      content: " ";
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border-width: 2px;
      border-style: solid;
      animation: ui-loader-ring 1.2s linear infinite;
      border-color: transparent $white $white $white;
    }

    &_secondary:after {
      border-color: transparent $teal $teal $teal;
    }
  }
}

@keyframes ui-loader-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
