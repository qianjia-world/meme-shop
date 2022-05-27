<template>
<footer class="HomeFooter">
  <ul>
    <li>
      <router-link to="/">工程師迷因</router-link>
    </li>
    <li>
      <router-link to="/">Programming X Meme</router-link>
    </li>
    <li>
      <router-link to="/login">小房間</router-link>
    </li>
  </ul>
</footer>
</template>

<style lang="scss">
.HomeFooter ul{
  display: flex;
  justify-content: center;
  background-color: antiquewhite;
  padding: 22px 0px;
  li{
    margin: 0 20px;
  }
}
</style>
