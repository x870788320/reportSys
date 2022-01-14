<template>
  <Home/>
</template>

<script>
import Home from './Pages/Home'
import { defineComponent} from "vue";
export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
    // Home: () => import ('./Pages/Home')   //以后研究一下
    Home
  }
})
</script>


<style>
@import "./index.css";
</style>
