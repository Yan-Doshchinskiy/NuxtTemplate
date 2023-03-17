<template>
  <div class="ui-page">
    <section class="ui-page__section">
      <div
        v-for="size in badgeStyles"
        :key="size"
        class="ui-page__row"
      >
        <UiBadge
          v-for="variant in badgeVariants"
          :key="`${size}-${variant}`"
          :variant="variant"
          :size="size"
          :label="`${variant} ${size}`"
        />
      </div>
    </section>
    <section class="ui-page__section">
      <div class="ui-page__row">
        <UiButton
          v-for="variant in buttonVariants"
          :key="variant"
          :variant="variant"
          :data-selector="variant"
          :label="variant"
        />
      </div>
      <div class="ui-page__row">
        <UiButton
          v-for="variant in buttonVariants"
          :key="`${variant}-disabled`"
          :variant="variant"
          :data-selector="`${variant}-disabled`"
          :label="variant"
          :disabled="true"
        />
      </div>
      <div class="ui-page__row">
        <UiButton
          v-for="variant in buttonVariants"
          :key="`${variant}-loading`"
          :variant="variant"
          :data-selector="`${variant}-loading`"
          :label="variant"
          :is-loading="true"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import UiBadge, { TBadgeSize, TBadgeVariant } from '~/components/shared/UiBadge/index.vue';
import UiButton, { TButtonVariant } from '~/components/shared/UiButton/index.vue';

@Component({
  name: 'UiPage',
  components: {
    UiBadge,
    UiButton
  }
})
export default class UiPage extends Vue {
  private readonly badgeVariants:Array<TBadgeVariant> = ['default', 'warning', 'danger', 'success', 'info'];
  private readonly badgeStyles:Array<TBadgeSize> = ['medium', 'small'];
  private readonly buttonVariants:Array<TButtonVariant> = ['primary', 'secondary', 'danger']
}
</script>
<style lang="scss" scoped>
.ui-page {
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
  width: 100%;
  &__section {
    display: flex;
    flex-direction: column;
    grid-row-gap: 12px;
  }
  &__row {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 12px;
  }

}
</style>
