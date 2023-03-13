<template>
    <div class="toast-wrapper">
        <div class="toast">
            An error occurred
        </div>
    </div>
</template>

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
    color: white;
    background: #ff0062;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
}
</style>