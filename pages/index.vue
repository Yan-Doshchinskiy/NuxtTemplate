<template>
  <div class="main-page">
    Main page
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'IndexPage',
})
export default class IndexPage extends Vue {

}
</script>
<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

}
</style>
