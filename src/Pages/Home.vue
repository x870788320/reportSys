<template>
  <div class="home">
      <HomeMap />
      <HomeFloat />
  </div>
</template>

<script>
import { defineComponent} from "vue";

import HomeMap from '../components/HomeMap'
import HomeFloat from '../components/homeFloatCom/HomeFloat'
export default defineComponent({
    name: 'Home',
    components: { HomeMap, HomeFloat },
})
</script>

<style scoped>
.home{
    position: relative;
}
</style>
