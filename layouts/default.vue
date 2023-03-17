<template>
  <div class="default-layout">
    <header class="default-layout__header">
      The Header
    </header>
    <main class="default-layout__wrapper">
      <nuxt />
    </main>
    <footer class="default-layout__footer">
      The Footer
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DefaultLayout'
})
export default class DefaultLayout extends Vue {

}
</script>

<style lang="scss">
.default-layout {
  position: relative;

  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    @include container(48px 64px);
    flex-grow: 1;
    position: relative;
    display: flex;
  }

}
</style>
