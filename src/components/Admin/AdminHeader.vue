<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">programming x meme </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/goods" >產品</router-link >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orders" >訂單</router-link >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupons" >優惠卷</router-link >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/articles" >文章</router-link >
        </li>
      </ul>
      <span class="navbar-text">
        Meme Meme Meme
      </span>
    </div>
  </div>
</nav>
</template>
