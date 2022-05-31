<template>
<header class="HomeHeader">
  <ul>
    <li class="hide">
      <router-link to="/" >工程師迷因</router-link>
    </li>
    <li>
      <router-link to="/">Programming X Meme</router-link>
    </li>
    <li class="hide">
      <router-link to="/aboutus" >關於我</router-link>
    </li>
  </ul>
</header>
</template>

<style lang="scss">
.HomeHeader{
  padding: 20px 0px;
  font-weight: 600;
  background-color: antiquewhite;
  ul{
  display: flex;
  justify-content: center;
    li{
    margin: 0 20px;
    padding: 10px;
    }
  }
}
@media (max-width:510px) {
  .HomeHeader{
  padding: 10px 0px;
  font-weight: 600;
  background-color: antiquewhite;
  ul{
    li{
    margin: 0 5px;
    padding: 10px;
    }
    .hide{
      display: none;
    }
  }
}
}
</style>
