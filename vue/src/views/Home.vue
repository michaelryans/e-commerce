<template>
  <div id="home">
    <h1>
      Welcome to e-commerce js!<br>
      This mock app is built using Vue + Vue CLI + mongoose :)

    <b-container>
      <img src="http://mongodb-tools.com/img/mongoose.png" alt="">
      <img src="https://miro.medium.com/max/480/1*zyNSb0UXhP8TfxYbj-GNWg.png" alt="">
    </b-container>
    </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
#home {
  height: 500px;
  padding: 30px;
  display:flex;
  align-items: center;
}

img {
  height: 200px;
}

</style>

