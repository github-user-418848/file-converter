<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import NavReports from './components/NavReports.vue';

export default {
  name: "App",
  components: {
    NavReports,
  }
}
</script>

<style scoped>
.nav-links {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

a {
  color: inherit;
  padding: .5rem;
}

a:hover,
a.router-link-active {
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

/* select {
  border: 0;
  outline: none;
  background: rgba(0, 0, 0, .123);
  width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
  height: 35px;
} */
</style>
