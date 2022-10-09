<template>
    <div class="notification">
      <div>
        Save up to <em>200$</em> on Kivik. Check offers near you!
      </div>
    </div>
</template>

<script>
export default {
  name: 'notificationView',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
.notification {
  position: fixed;
  top: 75px;
  left: 0;
  font-family: 'Roboto', sans-serif;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 99999999999999999;
}

.notification > div {
  background: linear-gradient(90deg, #27bd62, #0dac48);
  padding: 15px 30px;
  border-radius: 50px;
  color: #fff;
  box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
  cursor: pointer;
  animation: slide-in .3s forwards ease-out;
  pointer-events: all;
}

.notification em {
  text-decoration: underline;
  font-style: normal;
}

@keyframes slide-in {
  0%{
    opacity: 0;

    transform: translateY(-50px) scale(.9);
  }
  100%{
    transform: translateY(0px)  scale(1);
  }
}
</style>
