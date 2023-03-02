<template>
  Select a filetype to convert with:
  <nav>
    <ul>
      <li v-for="report in reports" :key="report.id">
        <router-link :to="{ name: 'GenReport', params: { id: report.id } }">
          {{ report.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: "Navbar",
    data() {
      return {
        reports: [
          { title: 'MAP', id: 1 },
          { title: 'QAP', id: 2 },
          { title: 'SAWT', id: 3 },
          { title: 'Sales', id: 4 },
          { title: 'Purchase', id: 5 },
        ]
      }
    }
  }
</script>
<style>
  nav {
    max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
    width: 100%;
    margin: 0 auto;
    overflow-x: auto;
    padding: .5rem;
    border: 1px solid lightgray;
  }
  nav ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: .5rem;
    padding: 0px;
  }
  nav ul li {
    list-style-type: none;
  }
  nav ul li a {
    color: var(--primary);
    padding: clamp(0.2rem, 0.2rem + 0.25vw, 0.5rem);
    border-radius: 8px;
    transition: 0.3s;
  }
  nav ul li a:hover {
    background-color: var(--primary);
    color: white;
  }
  nav ul li a.router-link-active {
    background-color: var(--primary);
    color: white;
  }
</style>