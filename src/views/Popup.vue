<template>
  <div class="main_app">
    <div class="justify-center flex bg-yellow-300 items-center h-screen">
      <div class="text-4xl">Hello 👋🏼</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popupView',
  data() {
    return {
      msg: 'popup',
    };
  },
};

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
