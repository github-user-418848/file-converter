<template>
    <transition name="toast">
        <div class="toast-wrapper" v-if="errorMessage">
            <div class="toast">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                {{ errorMessage }}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        errorMessage: String,
    },
}

</script>

<style>
.toast-wrapper {
	position: fixed;
	max-width: clamp(9.375rem, 9.375rem + 23.4375vw, 37.5rem);
	top: 20px;
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	left: calc(clamp(0rem, 0rem + 100vw, 120rem) / 2 - clamp(9.375rem, 9.375rem + 23.4375vw, 37.5rem) / 2);
}
.toast {
    padding: clamp(0.625rem, 0.625rem + 0.5208vw, 1.25rem);
    color: #f84026;
    background: #ffc8c3;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: inline;
}
.toast > .bi {
    vertical-align: middle;
}
.toast-enter-from {
    opacity: 0;
    transform: translateY(-120px)
}
/* .toast-enter-to {
    opacity: 1;
    transform: translateY(0px)
} */
.toast-enter-active {
    transition: all 0.3s ease;
}

/* .toast-leave-from {
    opacity: 0;
    transform: translateY(0px)
} */
.toast-leave-to {
    opacity: 1;
    transform: translateY(-120px)
}
.toast-leave-active {
    transition: all 0.3s ease;
}

</style>