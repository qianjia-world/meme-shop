<template>
<header class="HomeHeader">
  <ul>
    <li>
      <router-link to="/">工程師迷因</router-link>
    </li>
    <li>
      <router-link to="/">Programming X meme</router-link>
    </li>
    <li>
      <router-link to="/aboutus">關於我</router-link>
    </li>
  </ul>
</header>
</template>

<style lang="scss">
.HomeHeader ul{
  display: flex;
  justify-content: center;
  background-color: antiquewhite;
  padding: 20px 0px;
  font-weight: 600;
  li{
    margin: 0 20px;
    padding: 10px;
  }
}
</style>
