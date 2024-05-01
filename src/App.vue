<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <body>
    <nav>
      <div class="nav__logo">
        <router-link to="/"><a href="#"><img src="/src/assets/MPBL Logo Hori Final.png" alt="logo" /></a></router-link>
      </div>
      <ul class="nav__links">
    <li class="link">
      <router-link to="/">Home</router-link>
    </li>
    <li class="link">
      <router-link to="/about">About Us</router-link>
    </li>
    <li class="link">
      <router-link to="/players">Players</router-link>
    </li>
    <li class="link">
      <router-link to="/teams">Teams</router-link>
    </li>
    <li class="link">
      <router-link to="/scoreboard">Scoreboard</router-link>
    </li>
  </ul>
    </nav>
    </body>
  </header> 


  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
:root {
  --primary-color: #111317;
  --secondary-color: rgb(147, 38, 38);
  --secondary-color-dark: #bb4e1b;
  --text-light: #d1d5db;
  --white: #ffffff;
  --max-width: 1200px;
} 

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

img {
  width: 100%;
  display: flex;
}

a {
  text-decoration: none;
}

.bg__blur {
  position: absolute;
  box-shadow: 0 0 1000px 50px var(--secondary-color);
  z-index: -1;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: #111317;
}

nav {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  color: white;
  background-color: #111317;
}

.nav__logo {
  max-width: 150px;
}

.nav__links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 3rem;
}

.link a {
  position: relative;
  padding-bottom: 0.75rem;
  color: #ffffff;
}

.link a::after {
  content: "";
  position: absolute;
  height: 2px;
  width: 0;
  left: 0;
  bottom: 0;
  background-color: rgb(147, 38, 38);
  transition: 0.3s;
}

.link a:hover::after {
  width: 50%;
}
</style>