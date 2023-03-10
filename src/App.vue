<template>
  <div class="content">
    <h1>Generate DAT File</h1>
    <NavReports />
    <router-view></router-view>
    <a href="https://github.com/github-user-418848/convert-to-dat-file" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="38" viewBox="0 0 24 24" xml:space="preserve">
        <path
          d="M12.01.26c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.05.14 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.69.83.58 4.76-1.59 8.2-6.08 8.2-11.38 0-6.64-5.37-12.01-12-12.01z"
          fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </a>
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

select {
  border: 0;
  outline: none;
  background: rgba(0, 0, 0, .123);
  width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
  height: 35px;
}

svg {
  padding: 10px;
}

a:hover svg {
  color: red;
}


</style>
