<script>
  export default {
    methods: {
      changeRoute(e) {
        this.$router.push("/" + e.target.value);
      },
    },
  }
</script>

<template>
  <div class="content">
    <h1>Convert to DAT File</h1>
    <select name="route" id="route" v-on:change="changeRoute($event)">
      <option value="" selected>MAP</option>
      <option value="qap">QAP</option>
    </select>
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
