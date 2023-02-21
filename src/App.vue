<template>
  <div class="content">
    <h1>Convert to DAT File</h1>
    <div class="nav-links">
      <router-link to="/">MAP</router-link>
      <router-link to="/qap">QAP</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
  h1 {
    font-size: clamp(1.5rem, 1.5rem + 1.25vw, 3rem);
  }
  .nav-links {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  a {
    color: inherit;
    padding: .5rem;
  }
  a:hover, a.router-link-active {
    color: var(--primary);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
</style>
