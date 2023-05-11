<template>
    <nav>
        <!-- <div class="navbar-brand">
            Generate DAT File
        </div> -->
        <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul :class="{ 'show-menu': showMenu }">
            <li v-for="view in views" :key="view.id">
                <!-- { name: 'GenReport', params: { id: view.id } } -->
                <router-link to="#">
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
                { id: 1, params: 'page1', name: 'Withholding Tax' },
                { id: 2, params: 'page2', name: 'Value Added Tax' },
                { id: 3, params: 'page3', name: 'Book of Accounts' },
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
    },
}
</script>
  
<style>
nav {
    background-color: #e4e4e4;
    border-bottom: .5px solid lightgray;
    color: #242424;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.navbar-brand {
    font-size: 22px;
    font-weight: 400;
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

.router-link {
    color: #242424;
}

.router-link-active {
    color: #242424;
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
    background-color: #242424;
    margin-left: auto;
}

.menu-toggle span:nth-child(2) {
    width: 75%;
}

.menu-toggle span:last-child {
    width: 50%;
}

.show-menu {
    border-top: .5px solid lightgray;
    display: flex;
    flex-direction: column;
    text-align: right;
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    background-color: #e4e4e4;
}

.show-menu li {
    padding: clamp(1.0625rem, 1.0625rem + 0.4167vw, 1.5625rem);
}

@media screen and (max-width: 768px) {

    nav {
        justify-content: flex-end;
    }

    ul {
        display: none;
    }

    .menu-toggle {
        display: flex;
    }
}
</style>