<template>
<footer class="HomeFooter">
  <ul>
    <li>
      <router-link to="/">工程師迷因</router-link>
    </li>
    <li>
      <router-link to="/">Programming X meme</router-link>
    </li>
    <li>
      <router-link to="/">關於我</router-link>
    </li>
  </ul>
</footer>
</template>

<style lang="scss">
.HomeFooter ul{
  display: flex;
  justify-content: center;
  background-color: antiquewhite;
  padding: 20px 0px;

  li{
    margin: 0 20px;
  }
}
</style>
