<template>
  <Header />
  <div class="content">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script>
import Header from './snippets/Header.vue'
import Footer from './snippets/Footer.vue'

export default {
  name: "App",
  components: {
    Header,
    Footer,
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
</style>
