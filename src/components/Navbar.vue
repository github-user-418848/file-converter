<template>
    <nav>
        <h3 class="navbar-brand">
            {{ displayTaxName }}
        </h3>
        <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul :class="{ 'show-menu': showMenu }">
            <li v-for="view in views" :key="view.id">
                <router-link :to="generateRoute(view)">
                    {{ view.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>
  
<script>
export default {
    name: 'Navbar',
    data() {
        return {
            showMenu: false,
            isMobile: false,
            views: [
                { id: 1, params: { tax_type: 'wt', report_type: 'map', form_type: '1601E' }, name: 'Withholding Tax' },
                { id: 2, params: { tax_type: 'vat', report_type: 'st' }, name: 'Value Added Tax' },
                { id: 3, params: { tax_type: 'boa' }, name: 'Book of Accounts' },
            ]
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    },
    destroyed() {
        window.removeEventListener("resize", this.checkMobile);
    },
    computed: {
        displayTaxName() {
            return this.views.find(view => view.params.tax_type === this.$route.params.tax_type)?.name
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
            if (!this.isMobile) {
                this.showMenu = false;
            }
        },
        generateRoute(view) {
            return {
                name: 'TaxPage',
                params: view.params
            }
        },
    }
}
</script>
  
<style>
nav {
    background-color: var(--primary);
    border-bottom: .5px solid lightgray;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.navbar-brand {
    display: none;
    font-size: clamp(1.0625rem, 1.0625rem + 0.3906vw, 1.25rem);
    font-weight: bold;
}

ul {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 0;
    padding: 0;
}

nav li {
    padding: 0 clamp(0.9375rem, 0.9375rem + 0.7813vw, 1.875rem);
}

nav a,
.router-link {
    color: #fff;
}

nav a:hover,
.router-link-active {
    color: var(--secondary);
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    margin-bottom: 4px;
    background-color: #fff;
    margin-left: auto;
}

.menu-toggle span:nth-child(2) {
    width: 75%;
}

.menu-toggle span:last-child {
    width: 50%;
}

.show-menu {
    /* border-top: .5px solid lightgray; */
    display: flex;
    flex-direction: column;
    text-align: right;
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    background-color: var(--primary);
}

.show-menu li {
    padding: clamp(1.0625rem, 1.0625rem + 0.4167vw, 1.5625rem);
}

@media screen and (max-width: 768px) {

    .navbar-brand {
        display: block;
        text-align: left;
    }
    nav {
        justify-content: space-between;
    }

    ul {
        display: none;
    }

    .menu-toggle {
        display: flex;
    }
}
</style>