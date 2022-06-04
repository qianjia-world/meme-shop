<template>
<footer class="HomeFooter">
  <ul>
    <li>
      <router-link to="/">Programming X Meme</router-link>
    </li>
    <li>
      <router-link to="/login">後台登入</router-link>
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
@media (max-width:510px) {
  .HomeFooter ul{
    padding: 15px 0px;
    li{
      margin: 0 5px;
    }
  }
}
</style>
