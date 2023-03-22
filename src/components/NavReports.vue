<template>
  <h2>{{ reportName }}</h2>
  <h3>Select a type of report to convert with:</h3>
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
        { title: 'MAP', id: 1, name: 'Monthly Alphalist of Payees' },
        // { title: 'QAP', id: 2, name: 'Quarter' },
        { title: 'SAWT', id: 3, name: 'Summary Alphalist of Withholding Taxes' },
        // { title: 'Sales', id: 4 },
        // { title: 'Purchase', id: 5 },
      ]
    }
  },
  computed: {
    reportName() {
      const id = Number(this.$route.params.id);
      const report = this.reports.find(report => report.id === id);
      return report ? report.name : '';
    }
  }
}
</script>
<style>
h2 {
  font-size: clamp(1.25rem, 1.25rem + 0.2083vw, 1.5rem);
  margin-bottom: clamp(0.4rem, 0.4rem + 0.5vw, 1rem);
}
h3 {
  font-size: clamp(1rem, 1rem + 0.1042vw, 1.125rem);
  margin-bottom: clamp(0.4rem, 0.4rem + 0.5vw, 1rem);
}

nav {
  max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
  width: 100%;
  margin: 0 auto;
  overflow-x: auto;
  padding: clamp(0.9rem, 0.9rem + 0.5vw, 1.5rem);
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