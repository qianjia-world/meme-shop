<template>
<header class="HomeHeader">
  <div>
      <router-link to="/">Programming X Meme</router-link>
  </div>
</header>
</template>

<style lang="scss">
.HomeHeader{
  padding: 20px 0px;
  font-weight: 600;
  background-color: antiquewhite;
  >div{
  display: flex;
  justify-content: center;
    a{
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
  >div{
    a{
    margin: 0 5px;
    padding: 10px;
    }
  }
}
}
</style>
