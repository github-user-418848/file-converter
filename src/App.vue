<script>

</script>

<template>
  <div class="content">
    <h1>Convert to DAT File</h1>
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

  select {
    border: 0;
    outline: none;
    background: rgba(0, 0, 0, .123);
    width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
    height: 35px;
  }
</style>
